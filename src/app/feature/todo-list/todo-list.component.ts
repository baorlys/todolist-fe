import {
  Component
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
import {ProjectService} from "../project/service/project.service";
import Swal from 'sweetalert2';

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
export class TodoListComponent{
  searchText: string = '';
  user: any;
  todos: any[] = []
  doings: any[] = []
  done: any[] = []

  project: any

  constructor(private http: HttpClient,
              private todoListService: TodoListService,
              private taskService: TaskService,
              private projectService: ProjectService,
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
        projectId: 0,
        estimation: todoUpdate.estimation,
        userId: this.user.id
      }
      if(todoUpdate.project != null) {
        req.projectId = todoUpdate.project.id
      }
      this.todoListService.update(todoUpdate.id, req).subscribe(
        {
          next: data => {
            this.loadTodos()
          },
          error: err => {
            console.log(err);
            this.showFail( 'Update failed!', 'has not been updated!')
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
          if(result.data.priorityId=== null) {
            result.data.priorityId = 4
          }
          this.todoListService.update(item.id, result.data.todolist).subscribe(
            {
              next: data => {
                this.showSuccess( 'Update success!', 'has been updated!');
                this.loadTodos()
              },
              error: err => {
                this.showFail( 'Update failed!', 'has not been updated!');
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
            this.showFail( 'Task update failed!', 'has not been updated!');
          }

        }
    })

  }

  delete(item: any, $event:any) {

    $event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this todo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        if(item.userId != this.user.id) {
          this.showInfo('Can not delete', 'You are not the owner of this todo!')
          this.todoListService.removeAssignee(item.id, this.user.email).subscribe(
            {
              next: data => {
                this.showSuccess('Remove assignee success!', 'You has been removed!');
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail( 'Remove assignee failed!', 'You has not been removed!');
              }
            })
        } else {
          this.todoListService.delete(item.id).subscribe(
            {
              next: data => {
                this.showSuccess( 'Delete success!', 'Todo has been deleted!');
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail( 'Delete failed!', 'Todo has not been deleted!');
              }
            })
        }
      }
    })
  }


  create() {
    this.dialog.open(TdlAddComponent, {
      width: '500px',
      disableClose: true,
      data: {
        project: this.project
      }
    }).afterClosed().subscribe(result => {
      if(result.event === 'confirm') {
        if(this.project) {
          result.data.projectId = this.project.id
        }
        this.todoListService.create(result.data).subscribe(
          {
            next: data => {
              this.showSuccess( 'Create success!', 'has been created!');
              this.loadTodos()
              this.edit(data)
            },
            error: err => {
              console.log(err);
              this.showFail('Create failed!', 'has not been created!');
            }
          })
      }
    })
  }
  showSuccess(title: string, message: string) {
    this.toastr.success(message, title);
  }

  showFail(title: string, message: string) {
    this.toastr.error(message, title);
  }

  showInfo(title: string, message: string) {
    this.toastr.info(message, title);
  }

  removeAllTodosDone() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete all todos done?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.done.forEach((todo: any) => {
          let todoDel = todo
          this.todoListService.delete(todo.id).subscribe(
            {
              next: data => {
                this.showSuccess('Delete success!', '');
                this.loadTodos()
              },
              error: err => {
                console.log(err);
                this.showFail( 'Delete failed!', '');
              }
            })
        })
      }
    })
  }



}



export interface Column {
  id: string;
  name: string;
  data: any;
}



