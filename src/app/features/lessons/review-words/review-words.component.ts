import { Component, OnInit } from '@angular/core';
import { activityTypes } from 'src/app/shared/interfaces/user-activity.interface';
import { WordsInQuiz } from '../interfaces/words-in-quiz.interface';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReviewService } from '../services/review.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { ReviewWords } from '../interfaces/review-words.interface';
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review-words',
  templateUrl: './review-words.component.html',
  styleUrls: ['./review-words.component.scss'],
})
export class ReviewWordsComponent {

  backRoute: string = '/app/lessons'

  reviewType: string = activityTypes[0]

  listWords: WordsInQuiz[] = []

  reviewWords: ReviewWords | undefined
  usedUserLanguages: UserLanguages | undefined

  reviewTitle: string = ""

  constructor(
    private reviewService: ReviewService,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private configService: ConfigService,
    private eventsService: EventsService,
    private router: Router,
    private navController: NavController,
    private translate: TranslateService,
  ) {
    this.reviewTitle = this.translate.instant('lessons.reviewWords')
  }

  ionViewWillEnter() {
    if (this.authService.getIdUser() && this.configService.preferredUserLanguages) {
      this.usedUserLanguages = this.configService.preferredUserLanguages
      this.fetchWords()
    } else {
      this.exitView()
    }
  }

  fetchWords() {

    if (this.authService.getIdUser() && this.usedUserLanguages) {
      this.reviewService.getReviewWords(this.usedUserLanguages).subscribe(
        userReviewWords => {
          this.eventsService.showSpinner$.next(true);
          this.reviewWords = userReviewWords

          this.listWords = this.reviewWords.wordsList

          this.eventsService.showSpinner$.next(false);
        }
      )
    }
  }

  exitView() {
    this.navController.pop()
    // this.navController.navigateBack()
    this.router.navigate(['app/lessons'])
  }

}
