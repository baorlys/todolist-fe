import {Component, OnInit} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {TodoListRequest} from "../service/todo-list.service";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  ThemePalette
} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import _moment, {default as _rollupMoment} from 'moment';
import {MatChipsModule} from "@angular/material/chips";
import {StorageService} from "../../../core/service/storage.service";
import {TdlConfirmCancelFormComponent} from "../tdl-confirm-cancel-form/tdl-confirm-cancel-form.component";
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-tdl-add',
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
    MatChipsModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './tdl-add.component.html',
  styleUrl: './tdl-add.component.css'
})
export class TdlAddComponent implements OnInit{

  data : TodoListRequest = {
    title: '',
    description: '',
    typeId: 1,
    priorityId: 4,
    order: -1,
    estimation: new Date(),
    userId: this.storage.getItem('user').id
  }

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
  minDate = new Date();



  constructor(public dialogRef: MatDialogRef<TdlAddComponent>,
              private storage: StorageService,
              public dialog: MatDialog
             ) {}

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.close();
      }
    });
    this.dialogRef.backdropClick().subscribe(() => {
      this.close();
    })

  }
  confirmCreate() {
    this.dialogRef.close({event:'confirm',data:this.data});
  }

  close() {
    this.dialog.open(TdlConfirmCancelFormComponent, {
      width: '300px',
    }).afterClosed().subscribe(result => {
      if(result === "1") {
        this.dialogRef.close({event:'close'});
      }
    });
  }

}

export interface Priority {
  id: number
  name: string;
  color: ThemePalette;
}


