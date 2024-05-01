import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from './shared/services/user-info.service';
import { MastersService } from './shared/services/masters.service';
import { ConfigService } from './shared/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private mastersService: MastersService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.mastersService.fetchBasicMasters()
      if (!this.isLoggedIn) {
        this.router.navigate(["/login"])
      } else {
        this.mastersService.fetchMasters()
        this.userInfoService.fetchData()
      }
    });
  }

}
