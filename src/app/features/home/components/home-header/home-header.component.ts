import { Component, Input } from '@angular/core';
import { UserProgress } from 'src/app/shared/interfaces/user-related/user-progress.interface';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent {

  @Input() userProgress: UserProgress | undefined

  levelProgressValue: number = 0

  constructor(
    private userInfoService: UserInfoService,
  ) { }

}
