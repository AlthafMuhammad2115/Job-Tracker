import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUpMode = false; // Initially set to Login mode
  submit = false;
  loginMessage: any;
  submitsignup: boolean = false;
  signupMessage: any;
  constructor(
    private fb: FormBuilder,
    private userserv: UserService,
    private route: Router
  ) {}
  // Toggle between Login and Sign-up
  switchMode(mode: boolean) {
    this.isSignUpMode = mode;
  }

  //login

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f() {
    return this.loginForm.controls;
  }

  logincred: any;
  response: any;
  onsubmit() {
    this.submit = true;
    if (this.loginForm.invalid) return;

    let user = this.userserv
      .userlogin(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res);

          this.route.navigateByUrl('/home');
          this.userserv.setUserToLocalStorage('user', res);
          this.userserv.getUserFromLocalStorage('user');
        } else if (res.status === 302) {
          this.loginMessage = res.result;
        } else {
          this.loginMessage = res.result;
        }
      });
  }
  IsLogged = this.userserv.IsLogged;

  //signup

  public signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPass: ['', [Validators.required, Validators.minLength(8)]],
  });
  get fsignup() {
    return this.signupForm.controls;
  }

  onsubmitsignup() {
    this.submitsignup = true;
    if (this.signupForm.invalid) return;

    if (this.fsignup.password.value != this.fsignup.confirmPass.value) {
      this.signupMessage = 'Password Mismatch';
      return;
    }
    
    let user = this.userserv
      .usersignup({
        username: this.fsignup.username.value,
        email: this.fsignup.email.value,
        password: this.fsignup.password.value,
      })
      .subscribe((res: any) => {
        console.log(res);

        if (res.status === 200) {
          this.route.navigateByUrl('/home');
          this.userserv.setUserToLocalStorage('user', res);
          this.userserv.getUserFromLocalStorage('user');
        } else {
          this.signupMessage = res.result;
        }
      });
  }
}
