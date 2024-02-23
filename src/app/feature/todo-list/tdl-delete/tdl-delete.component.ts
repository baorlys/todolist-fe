import {Component, EventEmitter, Inject, Output, Type} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {TodoListService} from "../service/todo-list.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tdl-delete',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './tdl-delete.component.html',
  styleUrl: './tdl-delete.component.css'
})
export class TdlDeleteComponent {

  constructor(public dialogRef: MatDialogRef<TdlDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}


  confirmDelete() {
  }
}
