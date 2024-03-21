import {Component, OnInit} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {StorageService} from "../../../core/service/storage.service";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  provideNativeDateAdapter
} from "@angular/material/core";
import {ProjectService} from "../service/project.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatDialogTitle, MatDialogContent, MatInput, FormsModule, MatDialogActions, MatButton, MatDialogClose],
  providers: [provideNativeDateAdapter()],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent implements OnInit {
  data = {
    title : '',
    fromDate: '',
    toDate: '',
    userId: '',
  }
  user: any;
  minDate = new Date();

  constructor(public dialogRef: MatDialogRef<ProjectCreateComponent>,
              private storage: StorageService,
              public dialog: MatDialog,
              private projectService: ProjectService,
  ) {
    this.user = this.storage.getItem('user');
    this.data.userId = this.user.id;
  }

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

  close() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will lose your changes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, close it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close({event:'close'});
      }
    })

  }

  confirmCreate() {
    this.dialogRef.close({event:'confirm',data:this.data});
  }
}
