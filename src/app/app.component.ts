import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from './shared/services/user-related/user-info.service';
import { MastersService } from './shared/services/masters.service';
import { ConfigService } from './shared/services/app/config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private mastersService: MastersService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mastersService.fetchBasicMasters()

    this.authService.currentUserLoginOn.subscribe(currentUserLoginOn => {
      this.isLoggedIn = currentUserLoginOn;
      if (!this.isLoggedIn) {
        this.router.navigate(["/intro"])
      } else {
        this.userInfoService.fetchData()
      }
    });
  }

}
