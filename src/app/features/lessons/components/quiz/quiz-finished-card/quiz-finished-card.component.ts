import { Component, Input, OnInit } from '@angular/core';
import { UserActivity } from 'src/app/shared/interfaces/user-activity.interface';
import { WordsInQuiz } from '../../../interfaces/words-in-quiz.interface';

@Component({
  selector: 'app-quiz-finished-card',
  templateUrl: './quiz-finished-card.component.html',
  styleUrls: ['./quiz-finished-card.component.scss'],
})
export class QuizFinishedCardComponent implements OnInit {

  @Input() listWords: WordsInQuiz[] | undefined;
  @Input() userActivityResult: UserActivity | undefined;

  constructor() { }

  ngOnInit() { }

}
