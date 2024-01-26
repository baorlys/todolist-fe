import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth';
  private signUpUrl = 'http://localhost:8080/sign-up';

  constructor(private http: HttpClient) {
  }

  login(data: Login) {
    return this.http.post(this.loginUrl, data);
  }

  signUp(data: SignUp) {
    return this.http.put(this.signUpUrl, data);
  }
}

export interface Login {
  email: string;
  password: string;

}
export interface SignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
