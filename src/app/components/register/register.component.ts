import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  userEmail: string = '';
  userPassword: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(public authenticationService: AuthenticationService) { }

  async register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.userEmail || !emailRegex.test(this.userEmail)) {
      this.emailError = 'Please enter a valid email address.';
      return;
    } else {
      this.emailError = '';
    }
    if (!this.userPassword || this.userPassword.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      return;
    } else {
      this.passwordError = '';
    }

    try {
      const response = this.authenticationService.SignUp(this.userEmail, this.userPassword);
      const result = await response;
      if (result.includes("Error (auth/email-already-in-use)")) {
        this.emailError = 'Email is already in use. Please use a different email address.';
      }
    } catch (error) {
      this.emailError = 'Invalid email or password';
    }
  }
}

