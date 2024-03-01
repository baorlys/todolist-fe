import { Component } from '@angular/core';
import {UserModel} from "../../model/Response/user.model";
import {StorageService} from "../../core/service/storage.service";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatInput,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user!: UserModel;
  constructor(
    storageService: StorageService,

  ) {
    this.user = storageService.getItem('user');
  }
}
