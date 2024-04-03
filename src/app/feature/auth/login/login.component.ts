import {Component, EventEmitter} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AuthService, Login} from "../service/auth.service";
import {JwtService} from "../../../core/service/jwt.service";
import {StorageService} from "../../../core/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../core/service/app.service";
import {SocialLinksComponent} from "../../../share/social-links/social-links.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule,
    SocialLinksComponent,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


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


  constructor(private readonly auth: AuthService,
              private jwt: JwtService,
              private storage: StorageService,
              private router : Router,
              private appService: AppService) {}



  loginUser() {
    this.auth.login(this.data)
      .subscribe({
        next: data  => {
          this.showSuccess()
          // @ts-ignore
          this.jwt.saveToken(data['jwt'])
          // @ts-ignore
          this.storage.setItem('user',data['user'])
          this.isLoggedIn = true;
          this.appService.changeLoginStatus(this.isLoggedIn);
          this.router.navigate(['/todo-list']).then(r => r);

        },
        error: err => {
          this.showFail()
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      })
  }




  showSuccess() {

    Swal.fire(
      "Login successful",
      "You are now logged in",
      "success")
  }

  showFail() {

    Swal.fire(
      "Login failed",
      "Please check your credentials",
      "error")
  }


}

