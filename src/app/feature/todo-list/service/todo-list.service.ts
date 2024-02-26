import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    return this.http.post(this.url + 'delete/' + todoListId, {});
  }

  create(data: TodoListRequest) {
    return this.http.put(this.url + 'create', data);
  }


  addAssignee(todoListId: string, assignee: AssigneeRequest) {
    return this.http.put(this.url + todoListId + '/add-assignee', assignee);
  }

  removeAssignee(todoListId: string, assignee: AssigneeRequest) {
    return this.http.post(this.url + todoListId + '/remove-assignee', assignee);
  }
}

export enum State {
  TODO = '1',
  DOING = '2',
  DONE = '3'
}

export interface TodoListRequest {
  title: string;
  description: string;
  typeId: number;
  priorityId: number;
  order: number;
  estimation: Date;
  userId: number
}

export interface AssigneeRequest {
  todoListId: number;
  email: string;
  permissionId: number;
}

