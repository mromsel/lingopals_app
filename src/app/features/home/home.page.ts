import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserProgress } from 'src/app/shared/interfaces/user-progress.interface';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  unsubscribe$: Subject<void> = new Subject<void>();

  idUser: number = 0;
  user: User | undefined;
  userProgress: UserProgress | undefined;

  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    if (this.userInfoService.userProgress) {
      this.userProgress = this.userInfoService.userProgress
      this.user = this.userInfoService.user
    } else {
      this.authService.logout()
      this.router.navigate(["/intro"])
    }
  }

  goToShop() {
    // TODO: CREATE SHOP LINK
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
