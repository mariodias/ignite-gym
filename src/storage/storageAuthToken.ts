import AsyncStorage from "@react-native-async-storage/async-storage";

 import { STORAGE_AUTH_TOKEN } from "@storage/storageConfig";

 export async function storageAuthTokenSave(token: string) {
   await AsyncStorage.setItem(STORAGE_AUTH_TOKEN, token);
  }

  export async function storageAuthTokenGet() {
    const token = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);
    return token;
  }

  export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(STORAGE_AUTH_TOKEN);
  }

