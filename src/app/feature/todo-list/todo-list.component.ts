import {
  Component, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card'
import {HttpClient} from "@angular/common/http";
import {State, TodoListRequest, TodoListService} from "./service/todo-list.service";
import {StorageService} from "../../core/service/storage.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TdlDeleteComponent} from "./tdl-delete/tdl-delete.component";
import {TdlAddComponent} from "./tdl-add/tdl-add.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatBadge} from "@angular/material/badge";
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {AsyncPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {TdlEditComponent} from "./tdl-edit/tdl-edit.component";
import {TaskService} from "./service/task.service";
import {TaskModel} from "../../model/Response/task.model";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Todo} from "../../model/Response/todo.model";
import {FilterTodoPipe} from "../../core/pipe/filter-todo.pipe";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {SkeletonModule} from "primeng/skeleton";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  CalendarDateFormatter,
} from 'angular-calendar';
import {
  SchedulerDateFormatter,
} from "angular-calendar-scheduler";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

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
    DatePipe,
    MatProgressBar,
    NgClass,
    NgForOf,
    FilterTodoPipe,
    MatCheckbox,
    FormsModule,
    AsyncPipe,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    SkeletonModule,
    MatTabGroup,
    MatTab,
    MatGridList,
    MatGridTile,

  ],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: SchedulerDateFormatter
  }],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  searchText: string = '';
  user: any;
  todos: any[] = []
  doings: any[] = []
  done: any[] = []

  project: any

  constructor(private http: HttpClient,
              private todoListService: TodoListService,
              private taskService: TaskService,
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
        priorityId: todoUpdate.priority.id,
        order: -1,
        estimation: todoUpdate.estimation,
        projectId: todoUpdate.project.id,
        userId: this.user.id
      }
      this.todoListService.update(todoUpdate.id, req).subscribe(
        {
          next: data => {
            this.loadTodos()
          },
          error: err => {
            console.log(err);
            this.showFail( todoUpdate, 'Update failed!', 'has not been updated!')
          }
        }
      )
    }
  }


  loadTodos() {
    this.todoListService.getByUserId(this.user.id).subscribe(data => {
      // @ts-ignore
      let filterProject = data.filter(data => data.project != null)
      if(this.project != undefined) {
        // @ts-ignore
        data = filterProject.filter(data => data.project.id == this.project.id)
      }
      // @ts-ignore
      this.todos = data.filter(data => data.state.type == '1')
      this.addTasksInfoToJson(this.todos)
      // @ts-ignore
      this.doings = data.filter(data => data.state.type == '2')
      this.addTasksInfoToJson(this.doings)
      // @ts-ignore
      this.done = data.filter(data => data.state.type == '3')
      this.addTasksInfoToJson(this.done)

    })


  }


  addTasksInfoToJson(list: Todo[]) {
    list.forEach((todo: Todo) => {
      // @ts-ignore
      todo.tasks.total = todo.tasks.length
      // @ts-ignore
      todo.tasks.done = todo.tasks.filter(task => task.isCompleted).length
    })
  }



  edit(item: any) {
    this.dialog.open(TdlEditComponent, {
      width: '700px',
      data: {
        item
      },
      disableClose: true
    })
      .afterClosed().subscribe(result => {
        if(result.event === 'confirm') {
          console.log(result.data)
          if(result.data.priorityId=== null) {
            result.data.priorityId = 4
          }
          this.todoListService.update(item.id, result.data.todolist).subscribe(
            {
              next: data => {
                this.showSuccess( result.data.todolist, 'Update success!', 'has been updated!');
                this.loadTodos()
              },
              error: err => {
                this.showFail( result.data.todolist, 'Update failed!', 'has not been updated!');
              }
            })
          let flagTaskUpdateError = false
          result.data.tasks.forEach((task: TaskModel) => {
            this.taskService.update(task.id, task).subscribe({
              next: data => {
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                flagTaskUpdateError = true
              }
            })
          })
          if(flagTaskUpdateError) {
            this.showFail( null, 'Task update failed!', 'has not been updated!');
          }

        }
    })

  }

  delete(item: any, $event:any) {
    $event.stopPropagation();
      this.dialog.open(TdlDeleteComponent, {
        width: '250px',
        data: {
          id: item.id,
          numTodos: 1
        },
      }).afterClosed().subscribe(result => {
        if(result === "1") {
          this.todoListService.delete(item.id).subscribe(
            {
              next: data => {
                this.showSuccess(item.title, 'Delete success!', 'has been deleted!');
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail( item.title, 'Delete failed!', 'has not been deleted!');
              }
            })
        }

      });


  }


  create() {
    this.dialog.open(TdlAddComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result.event === 'confirm') {
        if(this.project) {
          result.data.projectId = this.project.id
        }
        console.log(result.data)
        this.todoListService.create(result.data).subscribe(
          {
            next: data => {
              this.showSuccess( result.data, 'Create success!', 'has been created!');
              this.loadTodos()
              this.edit(data)
            },
            error: err => {
              console.log(err);
              this.showFail( result.data, 'Create failed!', 'has not been created!');
            }
          })
      }
    })
  }
  showSuccess(data: any, title: string, message: string) {
    this.toastr.success(data.title + ' ' + message, title);
  }

  showFail(data: any, title: string, message: string) {
    this.toastr.error(data.title + ' ' + message, title);
  }

  removeAllTodosDone() {
    let numTodos = this.done.length
    this.dialog.open(TdlDeleteComponent, {
      width: '250px',
      data: {
        numTodos: numTodos
      },
    }).afterClosed().subscribe(result => {
      console.log(this.done)
      if(result === "1") {
        this.done.forEach((todo: any) => {
          let todoDel = todo
          this.todoListService.delete(todo.id).subscribe(
            {
              next: data => {
                this.showSuccess(todoDel, 'Delete success!', 'has been deleted!');
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail( todoDel, 'Delete failed!', 'has not been deleted!');
              }
            })
        })
      }

    });

  }



}



export interface Column {
  id: string;
  name: string;
  data: any;
}



