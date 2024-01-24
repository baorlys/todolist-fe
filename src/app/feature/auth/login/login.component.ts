import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Login} from "../../../model/Login";
import {FormControl, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //Create form control
  login = new FormControl();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onFormSubmit(data: Login) {
    console.log(data);
    localStorage.setItem('email', data.email);
    this.router.navigateByUrl('/user').then(r => console.log(r));
  }

}
