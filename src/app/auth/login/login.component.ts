import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  forgottenPasswordForm!:FormGroup;
  hidePassword:boolean = true;
  isforgetPasswordMode:boolean = false;
  isLoading: boolean = false;

  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService,private snackbar:MatSnackBar){
     this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
     })

     this.forgottenPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
     })
  }

  togglePasswordVisibility(){
    this.hidePassword =!this.hidePassword
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(
        response => {
          this.snackbar.open('Login successful', 'close', { duration: 3000 });
  
         
          this.router.navigateByUrl('/dashboard/dashboard-ui'); 
        },
        (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          this.snackbar.open('Login error, maybe due to invalid credentials or network issues', 'close', { duration: 3000 });
        }
      ).add(() => {
        this.isLoading = false;
      });
    }
  }
  

  onSubmitForgotPassword() {
    if (this.forgottenPasswordForm.valid) {
      const { email } = this.forgottenPasswordForm.value;
      // Handle forgot password logic
      console.log('Forgot password request', { email });
    }
  }

  switchToRegister() {
    this.router.navigateByUrl('/auth/register')
  }

  switchToForgotPassword() {
    this.isforgetPasswordMode = true;
  }
}
