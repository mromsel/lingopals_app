import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user-related/user.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  unsubscribe$: Subject<void> = new Subject<void>();

  user: User | undefined;

  isAdmin = false

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private userInfoService: UserInfoService,
    private router: Router
  ) { }


  ionViewWillEnter() {
    if (!this.userInfoService.user) {
      this.logout()
    } else {
      this.user = this.userInfoService.user
      if (this.user.profileImageUrl != null) {
        let userProfileImage = document.getElementById("userProfileImage") as HTMLImageElement;
        userProfileImage.src = this.user.profileImageUrl
      }
      this.isAdmin = this.user.profile.idProfile == 1
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/intro"])
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  themeChanged(ev: any) {

  }
}
