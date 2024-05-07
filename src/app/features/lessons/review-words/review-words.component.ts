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

@Component({
  selector: 'app-review-words',
  templateUrl: './review-words.component.html',
  styleUrls: ['./review-words.component.scss'],
})
export class ReviewWordsComponent implements OnInit {

  backRoute: string = '/lessons'

  reviewType: string = activityTypes[0]

  listWords: WordsInQuiz[] = []

  reviewWords: ReviewWords | undefined

  reviewTitle: string = "Review words" // TODO: TRANSLATE

  constructor(
    private reviewService: ReviewService,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private eventsService: EventsService,
    private router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() {
    if (this.authService.getIdUser() && this.userInfoService.getUserLanguages()[0]) {
      this.fetchWords()
    } else {
      this.exitView()
    }
  }

  fetchWords() {
    if (this.authService.getIdUser()) {
      this.reviewService.getReviewWords(this.authService.getIdUser(), this.userInfoService.getUserLanguages()[0]).subscribe(
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
    this.router.navigate(['/lessons'])
  }

}
