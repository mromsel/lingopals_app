import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login()
    this.router.navigate(["/home"])
  }

}
