import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(["/login"])
  }

  signup() { }
}
