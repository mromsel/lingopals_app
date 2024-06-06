import { Component, OnInit } from '@angular/core';
import { UserProgress } from 'src/app/shared/interfaces/user-progress.interface';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {

  userProgress: UserProgress | undefined

  levelProgressValue: number = 0

  constructor(
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit() {
    if (this.userInfoService.idUser) {
      this.userInfoService.getUserProgress(this.userInfoService.idUser).subscribe(
        userProgress => {
          this.userProgress = userProgress

          let xpLevel = this.userProgress.xpLevel

          let xpProgress = (this.userProgress.xpPoints - xpLevel.xpRangeStart) / (xpLevel.xpRangeEnd - xpLevel.xpRangeStart)
          this.levelProgressValue = xpProgress
        }
      )
    }
  }
}
