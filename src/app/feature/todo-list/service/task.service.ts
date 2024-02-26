import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../../../model/Response/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/api/v1/task/';
  constructor(private http: HttpClient) {

  }

  update(taskId: number, task: TaskModel) {
      return this.http.post(this.url + 'update/' + taskId, task);
  }

  getTasksByTodoListId(todoListId: string) {
      return this.http.get(this.url + todoListId + '/tasks');
  }

  createTask(todoListId: string) {
    return this.http.put(this.url + todoListId + '/create-task', {});
  }

  delete(taskId: string) {
    return this.http.post(this.url + 'delete/' + taskId, {});
  }
}
