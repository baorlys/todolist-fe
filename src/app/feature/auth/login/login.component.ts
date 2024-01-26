import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService, Login} from "../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  /*account test
    test2@gmail.com
    12345678
  */
  data: Login = {
    email: '',
    password: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {

  }

  loginUser() {
    this.auth.login(this.data)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      })
  }

  reloadPage(): void {
    window.location.reload();
  }


}

