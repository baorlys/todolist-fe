import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/api/v1/task/';
  constructor(private http: HttpClient) {

  }

  update(taskId: string) {
      return this.http.get(this.url + 'update/' + taskId);
  }

  getTasksByTodoListId(todoListId: string) {
      return this.http.get(this.url + todoListId + '/tasks');
  }

  createTask(todoListId: string) {
    return this.http.put(this.url + todoListId + '/create-task', {});
  }
}
