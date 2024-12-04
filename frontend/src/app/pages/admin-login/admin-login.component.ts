import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  submit: boolean = false;
  submitsignup: boolean = false;
  isSignUpMode = false;
  loginMessage: string = '';
  signupMessage: string = '';
  userserv: any;

  constructor(
    private fb: FormBuilder,
    private adminserv: AdminService,
    private route: Router,
    private toast:ToastrService
  ) {}

  switchMode(mode: boolean) {
    this.isSignUpMode = mode;
  }

  //admin login
  loginForm = this.fb.group({
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

    this.adminserv.adminlogin(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.token) {
          console.log(res);

          this.route.navigateByUrl('/adminDashboard/' + res.userid);
          this.adminserv.setAdminToLocalStorage('admin', res);
          this.adminserv.IsAdminLoggedIn();
        }
      },
      (err) => {
        this.loginMessage = err.error.result;
      }
    );
  }

  //admin signup
  public signupForm = this.fb.group({
    company: ['', [Validators.required]],
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

    this.adminserv
      .adminsignup({
        company_name: this.fsignup.company.value,
        email: this.fsignup.email.value,
        password: this.fsignup.password.value,
      })
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.token) {
            this.route.navigateByUrl('/adminDashboard/' + res.userid);
            this.adminserv.setAdminToLocalStorage('admin', res);
            this.adminserv.IsAdminLoggedIn();
          }
        },
        (err) => {
          console.log(err);
          
          this.signupMessage = err.error.result;
        }
      );
  }
}
