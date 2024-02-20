import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService, Login} from "../service/auth.service";
import {JwtService} from "../../../core/service/jwt.service";
import {StorageService} from "../../../core/service/storage.service";

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

  role = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private readonly auth: AuthService, private jwt: JwtService, private storage: StorageService, private router : Router) {}

  ngOnInit(): void {

  }

  loginUser() {
    this.auth.login(this.data)
      .subscribe({
        next: data  => {
          alert("Login Success");
          // @ts-ignore
          this.jwt.saveToken(data['jwt'])
          // @ts-ignore
          this.storage.setItem('user',data['user'])
          this.router.navigateByUrl('/todo-list').then(r => console.log(r));
          this.isLoggedIn = true;
          this.reloadPage();
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

