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
  // correctOption: WordsInQuiz | undefined; ????

  constructor() { }

  ngOnInit() { }

  // checkOption(optionIndex: number) {
  //   // if (!this.answerSubmitted && !this.isLessonFinished) {
  //   //   this.answerSubmitted = true
  //   //   this.options[optionIndex].pressed = true
  //   // }
  //   // if (this.index === this.totalIndexWords) {
  //   //   this.progress += this.progressStep
  //   //   this.finishLesson()
  //   // }
  // }

  checkOption(optionIndex: number) {
    // this.isAnswerSubmitted = true
    this.currentOptions[optionIndex].pressed = true
    this.answerSubmitted.emit(optionIndex);
    // this.isAnswerSubmitted = false

  }
}
