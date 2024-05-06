import { Component, OnInit } from '@angular/core';
import { activityTypes } from 'src/app/shared/interfaces/user-activity.interface';
import { WordsInQuiz } from '../interfaces/words-in-quiz.interface';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-review-words',
  templateUrl: './review-words.component.html',
  styleUrls: ['./review-words.component.scss'],
})
export class ReviewWordsComponent implements OnInit {

  backRoute: string = '/lessons'

  reviewType: string = activityTypes[0]

  listWords: WordsInQuiz[] = []

  reviewTitle: string = "Review words" // TODO: TRANSLATE

  constructor(
    private router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() { }

  exitView() {
    this.navController.pop()
    // this.navController.navigateBack()
    this.router.navigate(['/lessons'])
  }

}
