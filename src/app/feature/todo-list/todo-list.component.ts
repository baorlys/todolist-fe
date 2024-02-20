import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card'
import {HttpClient} from "@angular/common/http";
import {TodoListService} from "./service/todo-list.service";
import {StorageService} from "../../core/service/storage.service";
import {Timestamp} from "rxjs";
import {MatButton, MatIconButton} from "@angular/material/button";
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButton,
    MatIconButton
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  user: any;
  todos: any[] = []
  doings: any[] = []
  done: any[] = []

  constructor(private http: HttpClient, private todo: TodoListService, private storage: StorageService) {
    this.user = storage.getItem('user');
    this.loadTodos()
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let todoUpdate = event.container.data[event.currentIndex]
      switch (event.container.id.split('-')[3]) {
        case '0':
          todoUpdate.state.id = State.TODO
          break;
        case '1':
          todoUpdate.state.id = State.DOING
          break;
        case '2':
          todoUpdate.state.id = State.DONE
          break;
      }
      console.log(todoUpdate.id)
      console.log(todoUpdate.state.id)
      let req:  TodoListRequest = {
        title: todoUpdate.title,
        description: todoUpdate.description,
        stateId: todoUpdate.state.id,
        priorityId: -1,
        order: -1,
        estimation: todoUpdate.estimation
      }
      this.todo.update(todoUpdate.id, req).subscribe()


    }
  }

  loadTodos() {
    this.todo.getByUserId(this.user.id).subscribe(data => {
      // @ts-ignore
      this.todos = data.filter(data => data.state.id == '1')
      // @ts-ignore
      this.doings = data.filter(data => data.state.id == '2')
      // @ts-ignore
      this.done = data.filter(data => data.state.id == '3')


    })


  }

  edit(item: any) {

  }

  delete(item: any) {

  }

  create() {

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
  stateId: number;
  priorityId: number;
  order: number;
  estimation: Date;
}

