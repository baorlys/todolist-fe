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
  @Output() delete = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<TdlDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private todo: TodoListService,
              private toastr: ToastrService) {}


  confirmDelete() {
    // this.todo.delete(this.data.id).subscribe(
    //   {
    //     next: data => {
    //       this.showSuccess();
    //       this.dialogRef.close();
    //     },
    //     error: err => {
    //       console.log(err);
    //       this.showFail();
    //     }
    //   })
  }

  showSuccess() {
    this.toastr.success(this.data.title + ' has deleted!', 'Delete success!');
  }

  showFail() {
    this.toastr.error('Todo has not deleted!', 'Delete failed!');
  }
}
