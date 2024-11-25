import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  isSignUpMode = false; // Initially set to Login mode

  // Toggle between Login and Sign-up
  switchMode(mode: boolean) {
    this.isSignUpMode = mode;
  }
}
