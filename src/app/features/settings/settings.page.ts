import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  userInfo: UserInfo | undefined;

  constructor(
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfoService.getUserInfo(this.authService.getIdUser())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo
        // userInfo.profileImageUrl = "https://ionicframework.com/docs/img/demos/card-media.png"
        if (userInfo.profileImageUrl != null) {
          let userProfileImage = document.getElementById("userProfileImage") as HTMLImageElement;
          userProfileImage.src = userInfo.profileImageUrl
        }
      }
      )
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
