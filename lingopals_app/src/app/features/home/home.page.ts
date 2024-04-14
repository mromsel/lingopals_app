import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { UserProgress } from 'src/app/shared/interfaces/user-progress.interface';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo: UserInfo | undefined;
  userProgress: UserProgress | undefined;

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.getUserInfo(1).subscribe(userInfo => {
      this.userInfo = userInfo;
      this.userInfoService.getUserProgress(userInfo.idUser).subscribe(userProgress => {
        this.userProgress = userProgress
      }
      )
    })
  }

}
