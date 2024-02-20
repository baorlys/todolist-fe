import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoListRequest} from "../todo-list.component";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private url = 'http://localhost:8080/api/v1/todo-list/';
  constructor(private http: HttpClient) {

  }

  getByUserId(userId: string) {
    return this.http.get(this.url + 'user/' + userId);
  }

  getById(todoListId: string) {
    return this.http.get(this.url + todoListId);
  }

  getByState(userId: string, state: string) {
    return this.http.get(this.url + 'user/' + userId + '/' + state);
  }

  update(todoListId: string, data: TodoListRequest) {
    return this.http.post(this.url + 'update/' + todoListId, data);
  }



  delete(todoListId: string) {
    return this.http.delete(this.url + 'delete/' + todoListId);

  }

  create(data: TodoList) {
    return this.http.put(this.url + 'create', data);
  }

  createTask(todoListId: string) {
    return this.http.put(this.url + todoListId + '/create-task', {});
  }
}

export interface TodoList {
  title: string;
  description: string;
  stateId: string;
  priorityId: string;
  order: number;
  estimation: Date;
}

