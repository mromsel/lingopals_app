import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  TOKEN_KEY = "token"

  getItem(keyName: any) {
    return localStorage.getItem(keyName);
  }

  setItem(keyName: any, keyValue: any) {
    return localStorage.setItem(keyName, keyValue);
  }

  removeItem(keyName: any) {
    return localStorage.removeItem(keyName);
  }

  async clear() {
    await null;
    return localStorage.clear();
  }

}
