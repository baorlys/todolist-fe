import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = 'http://localhost:8080/api/v1/project/';
  constructor(private http: HttpClient) {

  }
  create(data: any) {
    return this.http.put(this.url + 'create', data);
  }

  update(data: any, projectId: string) {
    return this.http.post(this.url + 'update/' + projectId, data);
  }

  delete(projectId: string) {
    return this.http.post(this.url + 'delete/' + projectId, {});
  }



  getAll(userId: string) {
    return this.http.get(this.url + userId);
  }
}
