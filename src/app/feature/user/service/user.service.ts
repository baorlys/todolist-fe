import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../core/layout/header/header.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/v1/user';
  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(this.userUrl + '/all');
  }
}
