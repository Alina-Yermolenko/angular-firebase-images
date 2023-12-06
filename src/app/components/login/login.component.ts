import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userEmail: string = '';
  userPassword: string = '';
  loginError: string = '';

  constructor(public authenticationService: AuthenticationService) { }

  async login() {
    if (!this.userEmail || !this.userPassword) {
      this.loginError = 'Please enter both email and password';
      return;
    }

    try {
      const result = await this.authenticationService.SignIn(this.userEmail, this.userPassword);
      if (result &&JSON.stringify(result).includes("auth/invalid-credential")) {
        this.loginError = 'Wrong email or password';
      }
    } catch (error) {
      this.loginError = 'Invalid email or password';
    }
  }
}
