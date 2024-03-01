import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isLogin= new BehaviorSubject(false);
  currentLogin = this.isLogin.asObservable();
  constructor() { }

  changeLoginStatus(status: boolean){
    this.isLogin.next(status);
  }
}
