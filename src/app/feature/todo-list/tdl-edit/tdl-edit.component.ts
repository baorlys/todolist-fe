import {Component, ElementRef, inject, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatChipInputEvent, MatChipListbox, MatChipOption, MatChipsModule} from "@angular/material/chips";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TodoListRequest, TodoListService} from "../service/todo-list.service";
import {StorageService} from "../../../core/service/storage.service";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule, MatOption,
  ThemePalette
} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_FORMATS, Priority} from "../tdl-add/tdl-add.component";
import {StateService} from "../service/state.service";
import {StateModel} from "../../../model/Response/state.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSelect} from "@angular/material/select";
import { TableModule } from 'primeng/table';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {TaskModel} from "../../../model/Response/task.model";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../service/task.service";
import {PrimeIcons} from "primeng/api";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {UserService} from "../../user/service/user.service";

@Component({
  selector: 'app-tdl-edit',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatDialogActions,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatDialogClose,
    MatHint,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSelect,
    MatOption,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    TableModule,
    DropdownModule,
    InputTextModule,
    CurrencyPipe,
    MatIconButton,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    MatAutocomplete,
    MatAutocompleteModule,
    AsyncPipe,
    MatGridList,
    MatGridTile
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './tdl-edit.component.html',
  styleUrl: './tdl-edit.component.css'
})
export class TdlEditComponent implements OnInit{

  priorities : Priority[] = [
    {
      id: 1,
      name: 'Low',
      color: 'primary'
    },
    {
      id: 2,
      name: 'Medium',
      color: 'accent'
    },
    {
      id: 3,
      name: 'High',
      color: 'warn'
    }]
  states : StateModel[] = []
  minDate = new Date();
  tasks: TaskModel[] = []
  formData: TodoListRequest
  constructor(public dialogRef: MatDialogRef<TdlEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private stateService: StateService,
              private todoService: TodoListService,
              private storage: StorageService,
              private toastr: ToastrService,
              private userService: UserService,
              private taskService: TaskService,
  ) {
    this.formData = data.item
    this.loadStates()
    this.loadTasks()
    this.formData.priorityId = data.item.priority.id
    this.formData.typeId = data.item.state.type
    this.formData.estimation = new Date(data.item.estimation)
    if(data.item.assignees != null){
      // @ts-ignore
      this.assignees = data.item.assignees.map(assignee => assignee.email)
    }
    this.filteredAssignees = this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((assignee: string | null) => (assignee ? this._filter(assignee) : this.allUsersEmail.slice())),
    );
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.close();
      }
    });

    this.userService.getUsers().subscribe(data => {
      // @ts-ignore
      this.allUsersEmail = data.map(user => user.email != this.storage.getItem('user').email ? user.email : null).filter(email => email != null)
    })


  }


  confirm() {
    this.dialogRef.close({
      event:'confirm',
      data:{
        todolist: this.formData,
        tasks: this.tasks
    }});
  }
  close() {
    this.dialogRef.close({event:'close'});
  }


  createTask() {
    this.taskService.createTask(this.data.item.id).subscribe(
      {
        next: data => {
          this.showSuccess({title:""}, 'Success', 'Create task success')
          this.loadTasks()
        },
        error: error => {
          this.showFail({title:""}, 'Error', 'Create task failed')
        }
      })
  }

  loadTasks() {
    this.taskService.getTasksByTodoListId(this.data.item.id).subscribe(data => {
      // @ts-ignore
      this.tasks = data
    })
  }

  loadStates() {
    this.stateService.getByUserId(this.storage.getItem('user').id).subscribe((data ) => {
      // @ts-ignore
      this.states = data
    })
  }

  showSuccess(data: any, title: string, message: string) {
    this.toastr.success(data.title + ' ' + message, title);
  }

  showFail(data: any, title: string, message: string) {
    this.toastr.error(data.title + ' ' + message, title);
  }


  deleteTask(task: any) {
    this.taskService.delete(task.id).subscribe(
      {
        next: data => {
          this.showSuccess({title:""}, 'Success', 'Delete task success')
          this.loadTasks()
        },
        error: error => {
          this.showFail({title:""}, 'Error', 'Delete task failed')
        }
      })

  }


  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeCtrl = new FormControl('',[
    Validators.email
  ]);
  filteredAssignees: Observable<string[]>;
  assignees: string[] = [];
  allUsersEmail: string[] = [];

  // @ts-ignore
  @ViewChild('assigneeInput') assigneeInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      return;
    }
    if(this.assignees.includes(value)){
      return;
    }
    // Add our fruit
    if (value) {
      this.todoService.addAssignee(this.data.item.id, {todoListId:this.data.item.id,email: value, permissionId: 2}).subscribe(
        data => {
          this.assignees.push(value);
        })
    }

    // Clear the input value
    event.chipInput!.clear();

    this.assigneeCtrl.setValue(null);
  }

  remove(assignee: string): void {
    const index = this.assignees.indexOf(assignee);

    if (index >= 0) {
      this.todoService.removeAssignee(this.data.item.id, {todoListId:this.data.item.id,email: assignee, permissionId: 2}).subscribe(
        data => {
          this.assignees.splice(index, 1);
          this.announcer.announce(`Removed ${assignee}`);
        })

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.todoService.addAssignee(this.data.item.id, {todoListId:this.data.item.id,email: event.option.viewValue, permissionId: 2}).subscribe(
      data => {
        this.assignees.push(event.option.viewValue);
      })
    this.assigneeInput.nativeElement.value = '';
    this.assigneeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsersEmail.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}



