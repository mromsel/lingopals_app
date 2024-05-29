import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/shared/interfaces/user-signup.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router
  ) { }

  goToLogin() {
    this.router.navigate(["/login"])
  }

  signup() {
    // TODO: COMPROBACIONES
    console.log("signup method");

    if (this.formData.password == this.formData.confirmPassword) {

      let preferredLanguage = this.configService.preferredLanguage?.idLanguage ?? 1

      let userSignUp: UserSignUp = {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password,
        idPreferredLanguage: preferredLanguage,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
      console.log(userSignUp);

      this.authService.signup(userSignUp).subscribe(
        user => console.log(user)
      )
    }
  }
}
