import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserLogin } from 'src/app/shared/interfaces/auth/user-login.interface';
import { LocalStorageService } from 'src/app/shared/services/app/local-storage.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  formData = {
    username: '',
    password: ''
  };

  loggingFailed = false

  constructor(private authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.currentUserLoginOn.subscribe(
      currentUserLoginOn => {
        console.log("--" + currentUserLoginOn);
        if (currentUserLoginOn) this.router.navigate(["/app"])
      }
    )
  }

  login() {
    let userToSend: UserLogin = {
      username: this.formData.username,
      password: this.formData.password,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    this.authService.login(userToSend)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.loggingFailed = false
          this.router.navigate(["/app"])
        },
        error: () => {
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
