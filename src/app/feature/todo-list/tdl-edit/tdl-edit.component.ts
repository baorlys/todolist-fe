import {Component, ElementRef, inject, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TodoListRequest, TodoListService} from "../service/todo-list.service";
import {StorageService} from "../../../core/service/storage.service";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule, MatOption,
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
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatSelect} from "@angular/material/select";
import {TableModule } from 'primeng/table';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {AsyncPipe, CurrencyPipe, DatePipe} from "@angular/common";
import {TaskModel} from "../../../model/Response/task.model";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../service/task.service";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {UserService} from "../../user/service/user.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {UserModel} from "../../../model/Response/user.model";
import {TdlCommentListComponent} from "../tdl-comment-list/tdl-comment-list.component";
import {MatDivider} from "@angular/material/divider";
import {ProjectService} from "../../project/service/project.service";
import Swal from "sweetalert2";
import {EditorjsComponent} from "../../../share/editorjs/editorjs.component";
import {ShellComponent} from "../../../share/shell/shell.component";
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import {TdlLabelComponent} from "./tdl-label/tdl-label.component";
import {NzColorPickerComponent} from "ng-zorro-antd/color-picker";

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
    MatGridTile,
    MatCheckbox,
    TdlCommentListComponent,
    MatDivider,
    DatePipe,
    EditorjsComponent,
    ShellComponent,
    AngularEditorModule,
    TdlLabelComponent,
    NzColorPickerComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './tdl-edit.component.html',
  styleUrl: './tdl-edit.component.css'
})
export class TdlEditComponent implements OnInit{
  isAssignTodo = false
  config: AngularEditorConfig = {
    editable: !this.isAssignTodo,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    placeholder: 'Description...',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons:[
      ['fontSize'],
      ['insertImage'],
      ['insertVideo'],
      ['insertHorizontalRule'],
      ['removeFormat'],
      ['toggleEditorMode'],
      ['textColor'],
      ['backgroundColor'],
      ['customClasses'],
      ['unlink'],
      ['superscript'],
      ['subscript'],
      ['justifyLeft'],
      ['justifyCenter'],
      ['justifyRight'],
      ['justifyFull'],
      ['undo'],
      ['redo'],
    ],

  };


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
  maxDate !:Date;
  tasks: TaskModel[] = []
  formData: TodoListRequest
  user = this.storage.getItem('user')
  todoOwner : UserModel = {
    id: '',
    email:'',
    username:'',
    mobile:''
  }
  currentProject : any = null


  projectList: any[] = [];

  constructor(public dialogRef: MatDialogRef<TdlEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private stateService: StateService,
              private todoService: TodoListService,
              private storage: StorageService,
              private toastr: ToastrService,
              private userService: UserService,
              private taskService: TaskService,
              private userServive: UserService,
              private projectService: ProjectService,
              public dialog: MatDialog
  ) {
    this.formData = data.item
    this.loadStates()
    this.loadTasks()
    if(data.item.priority != null) {
      this.formData.priorityId = data.item.priority.id
    }
    if(data.item.project != null) {
      this.formData.projectId = data.item.project.id
      this.minDate = new Date(data.item.project.fromDate)
      this.maxDate = new Date(data.item.project.toDate)

    }

    this.formData.typeId = data.item.state.type
    this.formData.estimation = new Date(data.item.estimation)
    this.filteredAssignees = this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((assignee: string | null) => (assignee ? this._filter(assignee) : this.allUsersEmail.slice())),
    );
  }

  ngOnInit(): void {
    this.loadProjects()

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.close();
      }
    });
    this.dialogRef.backdropClick().subscribe(() => {
      this.close();
    })
    // @ts-ignore
    this.assignees = this.data.item.assignees.map(assignee => assignee.user.email)
    this.isAssignTodo = this.data.item.userId != this.user.id
    this.userService.getUsers().subscribe(data => {
      // @ts-ignore
      this.allUsersEmail = data.map(user => user.email != this.storage.getItem('user').email
        // @ts-ignore
        ? user.email : null).filter(email => email != null)
      this.allUsersEmail = this.allUsersEmail.filter(email => !this.assignees.includes(email))

    })
    if(this.isAssignTodo){
      this.userServive.getUserById(this.data.item.userId).subscribe(data => {
        // @ts-ignore
        this.todoOwner = data
      })
    }


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
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to discard the changes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close({event:'cancel'});
      }
    })


  }


  createTask() {
    this.taskService.createTask(this.data.item.id).subscribe(
      {
        next: data => {
          this.showSuccess({title:""}, 'Success', 'Create task success')
          // @ts-ignore
          this.tasks.push(data)
          this.formData.typeId = 2
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
  loadProjects() {
    this.projectService.getAll(this.storage.getItem('user').id).subscribe((data) => {
      // @ts-ignore
      this.projectList = data
    })
  }

  onTaskCompleteChange() {
    let allComplete: boolean = this.tasks.filter(task => task.isCompleted).length == this.tasks.length
    if(allComplete) {
      this.formData.typeId = 3
    }
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
  invalidForm: boolean = false



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      return;
    }
    if(this.assignees.includes(value)){
      return;
    }
    if (value) {
      this.todoService.addAssignee(this.data.item.id, {todoListId:this.data.item.id,email: value, permissionId: 2}).subscribe(
        data => {
          this.assignees.push(value);
        })
    }

    event.chipInput!.clear();
    this.assigneeCtrl.setValue(null);
  }

  remove(assignee: string): void {
    const index = this.assignees.indexOf(assignee);
    if (index >= 0) {
      this.todoService.removeAssignee(this.data.item.id, assignee).subscribe(
        data => {
          this.assignees.splice(index, 1);
          this.announcer.announce(`Removed ${assignee}`);
        })

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.assignees.includes(event.option.viewValue)){
      return;
    }
    this.todoService.addAssignee(this.data.item.id, {todoListId:this.data.item.id,email: event.option.viewValue, permissionId: 2}).subscribe(
      data => {
        this.assignees.push(event.option.viewValue);
      })
    this.assigneeInput.nativeElement.value = '';
    this.assigneeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsersEmail.filter(email => email.toLowerCase().includes(filterValue));
  }

  whenChangeProject() {
    this.currentProject = this.projectList.find(project => project.id == this.formData.projectId)
    this.minDate = new Date(this.currentProject.fromDate)
    if(this.minDate < new Date())
      this.minDate = new Date()
    if(this.formData.estimation < this.minDate) {
      this.formData.estimation = this.minDate
      this.toastr.info("Todo's estimation has been change", 'Change estimation');

    }
    this.maxDate = new Date(this.currentProject.toDate)
  }


}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}



