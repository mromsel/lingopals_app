import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn)
    });
  }

}
