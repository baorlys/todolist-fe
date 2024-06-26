import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService, SignUp} from "../service/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  data : SignUp = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) { }



  signUp(){
    if(this.validateConfirmPassword()) {
      this.errorMessage = 'Password and Confirm Password do not match';
      this.isSignUpFailed = true;
      return;
    }
    this.authService.signUp(this.data).subscribe({
      next: data => {
        this.data = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
        this.showSuccess()
        this.router.navigate(['/login']).then(r => r)
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  validateConfirmPassword() {
    return this.data.password === this.data.confirmPassword;
  }

  showSuccess() {
    Swal.fire(
      "Success",
      "Sign up successfully, please login to continue",
      "success")
  }



}

