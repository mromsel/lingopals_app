import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserLogin } from 'src/app/shared/interfaces/auth/user-login.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

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
    private userInfoService: UserInfoService,
    private router: Router) { }

  ngOnInit() {
    this.formData.usernameOrEmail = "usuario"
    this.formData.password = "usuario"
    this.login()
  }

  ionViewWillEnter() {
    if (this.authService.isLoggedInValue()) this.router.navigate(["/app"])

  }

  login() {
    let userToSend: UserLogin = new UserLogin(this.formData.usernameOrEmail, this.formData.password, Intl.DateTimeFormat().resolvedOptions().timeZone)

    this.authService.login(userToSend)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.loggingFailed = false
          this.authService.setIdUser(data.idUser)
          this.userInfoService.setIdUser(data.idUser)

          localStorage.setItem("token", data.token);
          this.authService.setIsUserLogged(true)

          localStorage.setItem("idUser", data.idUser);

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
