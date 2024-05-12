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
  usedUserLanguages: UserLanguages | undefined

  reviewTitle: string = "Review words" // TODO: TRANSLATE

  constructor(
    private reviewService: ReviewService,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private configService: ConfigService,
    private eventsService: EventsService,
    private router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() {
    if (this.authService.getIdUser() && this.userInfoService.userLanguages[0]) {
      let idUser = this.authService.getIdUser()
      if (idUser) {
        this.userInfoService.getUserInfo(idUser).subscribe(
          userInfo => {
            this.usedUserLanguages = userInfo.userLanguages.filter(userLanguages => userLanguages.preferred)[0]
            console.log(this.usedUserLanguages)
          }
        )
      }

      this.fetchWords()
    } else {
      this.exitView()
    }
  }

  ionViewWillEnter() {
    if (this.authService.getIdUser() && this.userInfoService.userLanguages[0]) {
      // let idUser = this.authService.getIdUser()
      // if (idUser) {
      //   this.userInfoService.getUserInfo(idUser).subscribe(
      //     userInfo => {
      //       this.usedUserLanguages = userInfo.preferredUserLanguages
      //     }
      //   )
      // }

      this.configService.getPreferredUserLanguages().subscribe(
        userLanguages => this.usedUserLanguages = userLanguages
      )
      this.fetchWords()
    } else {
      this.exitView()
    }
  }

  fetchWords() {
    // let idUser = this.authService.getIdUser()
    // if (idUser) {
    //   this.userInfoService.getUserInfo(idUser).subscribe(
    //     userInfo => {
    //       this.usedUserLanguages = userInfo.preferredUserLanguages
    //     }
    //   )
    // }

    if (this.authService.getIdUser() && this.usedUserLanguages) {
      this.reviewService.getReviewWords(this.authService.getIdUser(), this.usedUserLanguages).subscribe(
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
