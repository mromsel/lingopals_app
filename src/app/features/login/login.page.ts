import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserLogin } from 'src/app/shared/interfaces/user-login';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  formData = {
    usernameOrEmail: '',
    password: ''
  };

  loggingFailed = false

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.formData.usernameOrEmail = "usuario"
    this.formData.password = "usuario"
    this.login()
  }

  login() {
    let userToSend: UserLogin = new UserLogin(this.formData.usernameOrEmail, this.formData.password, Intl.DateTimeFormat().resolvedOptions().timeZone)

    this.authService.login(userToSend)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.loggingFailed = false
          this.authService.setIdUser(data.idUser)

          localStorage.setItem("token", data.token);
          this.authService.setIsUserLogged(true)

          this.router.navigate(["/app"])
        },
        error: () => {
          console.error();
          this.loggingFailed = true
        }
      })
  }

  goToSignUp() {
    // Redirects to sign up page
    this.router.navigate(["/signup"])
  }

  goToForgotPassword() {
    // Redirects to sign up page to forgot password page
    this.router.navigate(['/forgot-password']);
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
