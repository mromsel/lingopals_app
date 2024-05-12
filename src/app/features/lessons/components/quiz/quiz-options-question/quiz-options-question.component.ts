import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizOption } from '../../../interfaces/quiz-option.interface';
import { WordsInQuiz } from '../../../interfaces/words-in-quiz.interface';

@Component({
  selector: 'app-quiz-options-question',
  templateUrl: './quiz-options-question.component.html',
  styleUrls: ['./quiz-options-question.component.scss'],
})
export class QuizOptionsQuestionComponent implements OnInit {

  @Output() answerSubmitted = new EventEmitter<number>();
  @Input() currentOptions: QuizOption[] = []
  @Input() correctOption: QuizOption | undefined;
  @Input() isAnswerSubmitted: boolean = false;

  numberOfOptions: number = 4

  constructor() { }

  ngOnInit() { }

  checkOption(optionIndex: number) {
    this.currentOptions[optionIndex].pressed = true
    this.answerSubmitted.emit(optionIndex);
  }
}
