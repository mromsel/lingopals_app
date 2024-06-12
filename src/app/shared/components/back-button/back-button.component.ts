import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {

  @Input() backRoute: string = "";

  constructor(
    private navController: NavController,
    private router: Router
  ) { }

  navigateBack() {
    if (this.backRoute === "") this.navController.pop()
    else this.router.navigate([this.backRoute])
  }
}
