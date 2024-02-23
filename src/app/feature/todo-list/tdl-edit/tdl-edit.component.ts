import {Component, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatChipListbox, MatChipOption, MatChipsModule} from "@angular/material/chips";
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
import {CurrencyPipe} from "@angular/common";
import {TaskModel} from "../../../model/Response/task.model";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../service/task.service";
import {PrimeIcons} from "primeng/api";

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
    RippleModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './tdl-edit.component.html',
  styleUrl: './tdl-edit.component.css'
})
export class TdlEditComponent {

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
              private taskService: TaskService
  ) {
    this.formData = data.item
    this.loadStates()
    this.loadTasks()
    this.formData.priorityId = data.item.priority.id
    this.formData.typeId = data.item.state.type
    this.formData.estimation = new Date(data.item.estimation)
  }


  confirm() {
    this.dialogRef.close({event:'confirm',data:this.formData});
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
      console.log(data)
      console.log(this.tasks.length)
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


  onTaskChange() {

  }

  protected readonly PrimeIcons = PrimeIcons;

  deleteTask(task: any) {
    
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}



