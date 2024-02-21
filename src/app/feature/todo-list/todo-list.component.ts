import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card'
import {HttpClient} from "@angular/common/http";
import {State, TodoListRequest, TodoListService} from "./service/todo-list.service";
import {StorageService} from "../../core/service/storage.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TdlDeleteComponent} from "./tdl-delete/tdl-delete.component";
import {TdlAddComponent} from "./tdl-add/tdl-add.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatBadge} from "@angular/material/badge";
import {MatChip,MatChipsModule} from "@angular/material/chips";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";

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
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    MatBadge,
    MatChip,
    MatChipsModule,
    DatePipe
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  user: any;
  todos: any[] = []
  doings: any[] = []
  done: any[] = []

  constructor(private http: HttpClient,
              private todo: TodoListService,
              private storage: StorageService,
              public toastr: ToastrService,
              public dialog: MatDialog) {
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
          todoUpdate.state.type = State.TODO
          break;
        case '1':
          todoUpdate.state.type = State.DOING
          break;
        case '2':
          todoUpdate.state.type = State.DONE
          break;
      }

      let req:  TodoListRequest = {
        title: todoUpdate.title,
        description: todoUpdate.description,
        typeId: todoUpdate.state.type,
        priorityId: 4,
        order: -1,
        estimation: todoUpdate.estimation,
        userId: this.user.id
      }
      this.todo.update(todoUpdate.id, req).subscribe()


    }
  }

  loadTodos() {
    this.todo.getByUserId(this.user.id).subscribe(data => {
      // @ts-ignore
      this.todos = data.filter(data => data.state.type == '1')
      // @ts-ignore
      this.doings = data.filter(data => data.state.type == '2')
      // @ts-ignore
      this.done = data.filter(data => data.state.type == '3')


    })


  }



  edit(item: any) {

  }

  delete(item: any) {
      this.dialog.open(TdlDeleteComponent, {
        width: '250px',
        data: {
          id: item.id
        }
      }).afterClosed().subscribe(result => {
        if(result === "1") {
          this.todo.delete(item.id).subscribe(
            {
              next: data => {
                this.showSuccess(item.title);
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail();
              }
            })
        }

      });


  }

  removeItem() {

  }

  create() {
    this.dialog.open(TdlAddComponent, {
      width: '500px'
    })
  }
  showSuccess(data: any) {
    this.toastr.success(data.title + ' has deleted!', 'Delete success!');
  }

  showFail() {
    this.toastr.error('Todo has not deleted!', 'Delete failed!');
  }

}



