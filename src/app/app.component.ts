import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService, private userInfoService: UserInfoService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(["/login"])
      } else {
        this.userInfoService.fetchData()
      }
      console.log(this.isLoggedIn)
    });
  }

}
