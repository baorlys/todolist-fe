import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService, SignUp} from "../service/auth.service";
import {HttpClientModule} from "@angular/common/http";

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
export class SignupComponent implements OnInit {

  data : SignUp = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  signUp(){
    if(this.validateConfirmPassword()) {

    }
    this.authService.signUp(this.data).subscribe({
      next: data => {
        console.log(data);
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



}

