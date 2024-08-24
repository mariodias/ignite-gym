import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_AUTH_TOKEN } from "@storage/storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string; 
}

 export async function storageAuthTokenSave({token, refresh_token}: StorageAuthTokenProps) {
   await AsyncStorage.setItem(STORAGE_AUTH_TOKEN, JSON.stringify({ token, refresh_token }));
  }

  export async function storageAuthTokenGet() {
    const response = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);

    const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : { token: '', refresh_token: '' };
    return { token, refresh_token };
  }

  export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(STORAGE_AUTH_TOKEN);
  }

