import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private url = 'http://localhost:8080/api/v1/state/';
  constructor(private http: HttpClient) {

  }

  getByUserId(userId: string) {
    return this.http.get(this.url + userId + '/get-states');
  }


}

