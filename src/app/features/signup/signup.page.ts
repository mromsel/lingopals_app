import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/shared/interfaces/user-signup.interface';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  unsubscribe$: Subject<void> = new Subject<void>();

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  signUpFailed = false;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private alertController: AlertController,
    private translate: TranslateService,
    private router: Router
  ) { }

  goToLogin() {
    this.router.navigate(["/login"])
  }

  signup() {
    // TODO: COMPROBACIONES

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


      this.authService.signup(userSignUp).subscribe({
        next: (data) => {
          this.confirmAlert()
        },
        error: (errorResponse) => {
          let error: string = errorResponse.error.errors[0]
          let errorType = error.split(" ")[0]

          this.errorAlert(errorType);

          console.error();
          this.signUpFailed = true
        }
      })
    }
  }

  async confirmAlert() {

    const translations = {
      header: this.translate.instant('signup.successAlert.header'),
      message: this.translate.instant('signup.successAlert.message'),
      buttonText: this.translate.instant('common.buttonOkText')
    }

    const alert = await this.alertController.create({
      header: translations.header,
      message: translations.message,
      buttons: [
        {
          text: translations.buttonText,
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  async errorAlert(errorType: string) {
    let message = ""
    if (errorType == "username") {
      message = this.translate.instant('signup.errorAlert.usernameError')
    } else if (errorType == "email") {
      message = this.translate.instant('signup.errorAlert.emailError')
    } else {
      this.translate.instant('common.genericErrorMessage')
    }

    const translations = {
      header: this.translate.instant('common.errorAlertTitle'),
      message: message,
      buttonText: this.translate.instant('common.buttonOkText')
    }

    const alert = await this.alertController.create({
      header: translations.header,
      message: translations.message,
      buttons: [
        {
          text: translations.buttonText,
          handler: () => {
            // TODO: modify UI depending on error
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
