import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService, SignUp} from "../service/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

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
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {

  }

  signUp(){
    if(this.validateConfirmPassword()) {

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
    this.toastrService.success('You have successfully registered, please login', 'Success');
  }



}

