import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login()
    this.router.navigate(["/home"])
  }

  goToSignUp() {
    // Redirige al usuario a la página de registro
    this.router.navigate(["/signup"])
  }

  goToForgotPassword() {
    // Redirige al usuario a la página de recuperación de contraseña
    this.router.navigate(['/forgot-password']);
  }

}
