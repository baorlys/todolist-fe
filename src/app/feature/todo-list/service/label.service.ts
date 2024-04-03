import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private url = 'http://localhost:8080/api/v1/labels/';
  constructor(private http: HttpClient) {

  }

  getByUserId(userId: string) {
    return this.http.get(this.url + "user/" + userId);
  }

  getByTodoId(todoId: string) {
    return this.http.get(this.url + "todo/" + todoId);
  }

  createLabel(label: any) {
    return this.http.put(this.url + "create", label);
  }

  deleteLabel(labelId: string) {
    return this.http.delete(this.url + "delete/" + labelId);
  }
  addLabelToTodoId(todoId: string, labelId: string) {
    return this.http.patch(this.url + "todo/" + todoId + "/add", labelId);
  }

  removeLabelFromTodoId(todoId: string, labelId: string) {
    return this.http.patch(this.url + "todo/" + todoId + "/remove", labelId);
  }
}
