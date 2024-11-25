import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  isSignUpMode = false; // Initially set to Login mode

  constructor(private fb:FormBuilder,private userserv:UserService){}
  // Toggle between Login and Sign-up
  switchMode(mode: boolean) {
    this.isSignUpMode = mode;
  }

  public loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  public signupForm=this.fb.group({ 

  })

  get f(){
    return this.loginForm.controls
  }
  onsubmit(){
    console.log("this.f");
    
    // this.userserv.userlogin()
  }
}
