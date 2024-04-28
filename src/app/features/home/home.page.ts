import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { UserProgress } from 'src/app/shared/interfaces/user-progress.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  idUser: number = 0;
  userInfo: UserInfo | undefined;
  userProgress: UserProgress | undefined;

  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idUser = this.authService.getIdUser()

    if (this.idUser != 0) {
      this.userInfoService.getUserProgress(this.idUser)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(userProgress => {
          this.userProgress = userProgress
          this.userInfo = userProgress.user
        }
        )
    } else {
      this.authService.logout()
      this.router.navigate(["/login"])
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
