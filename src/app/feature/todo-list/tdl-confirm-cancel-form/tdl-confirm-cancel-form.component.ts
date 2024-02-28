import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-tdl-confirm-cancel-form',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './tdl-confirm-cancel-form.component.html',
  styleUrl: './tdl-confirm-cancel-form.component.css'
})
export class TdlConfirmCancelFormComponent {

  confirmClose() {

  }
}
