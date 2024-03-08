import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }


  getItem(key: string) {
    if(window.localStorage[key] == undefined) {
      return undefined;
    }
    return JSON.parse(window.localStorage[key]);
  }

  setItem(key: string, value: any): void {
    window.localStorage[key] = JSON.stringify(value);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
