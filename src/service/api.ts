import axios, { AxiosError, AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';

type SignOut = () => void;
type PromisseType = {
  onSucess: (token: string) => void;
  onError: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => void;
}

const api = axios.create({
  baseURL: 'http://192.168.3.36:3333',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}) as APIInstanceProps;

const interceptorRequest = api.interceptors.request.use(config => {
  console.log(config);
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

let failedRequestQueue: Array<PromisseType> = [];
let isRefreshingToken = false;

api.registerInterceptTokenManager = signOut => {
const interceptorTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
  if(requestError.response?.status === 401){
    if(requestError.response.data.message === 'token.expired' || requestError.response.data.message === 'token.invalid'){
      const { refresh_token } = await storageAuthTokenGet();

      if(!refresh_token){
        signOut();
        return Promise.reject(requestError);
      }

      const originalRequestConfig = requestError.config;
      if(!isRefreshingToken){
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSucess: (token: string) => {
              originalRequestConfig.headers = { 'Authorization': `Bearer ${token}`};
              resolve(api(originalRequestConfig));
            },
            onError: (error: AxiosError) => {
              reject(error);
            }
          })
        });
      }
      isRefreshingToken = true;

      return new Promise(async (resolve, reject) => {
        try {

          const { data } = await api.post('/sessions/refresh-token', { refresh_token });
          await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });

          if (
            originalRequestConfig.data &&
            !(originalRequestConfig.data instanceof FormData)
          ) {
            originalRequestConfig.data = JSON.parse(
              originalRequestConfig.data
            )
          }

          originalRequestConfig.headers = {
            ...originalRequestConfig.headers,
            Authorization: `Bearer ${data.token}`
          }
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

          failedRequestQueue.forEach(request => {
            request.onSucess(data.token);
          });

          resolve(api(originalRequestConfig));
        }
         catch (error: any) {
          failedRequestQueue.forEach(request => {
            request.onError(error);
          });

          signOut();
          reject(error);

        } finally {
          isRefreshingToken = false;
          failedRequestQueue = [];
        }
      });
    }
    
    signOut();
  }


  if(requestError.response && requestError.response.data){
    return Promise.reject(new AppError(requestError.response.data.message));
  } else {
    return Promise.reject(requestError);
  }
});

return () => {
  api.interceptors.response.eject(interceptorTokenManager);
}
}

export { api };