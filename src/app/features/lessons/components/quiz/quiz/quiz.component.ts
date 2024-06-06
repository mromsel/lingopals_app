import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserActivity, activityTypes } from 'src/app/shared/interfaces/user-related/user-activity.interface';
import { WordsInQuiz } from '../../../interfaces/words-in-quiz.interface';
import { QuizOption } from '../../../interfaces/quiz-option.interface';
import { Utils } from 'src/app/shared/utils/utils';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';
import { UserActivityService } from 'src/app/shared/services/user-related/user-activity.service';
import { ActivityResult } from 'src/app/features/lessons/interfaces/activity-result.interface';
import { EventsService } from 'src/app/shared/services/app/events.service';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { ActivityType } from 'src/app/shared/interfaces/masters/activity-type.interface';
import { UserLevelUpdate } from '../../../interfaces/user-level-update.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {

  unsubscribe$: Subject<void> = new Subject<void>();

  //#region Properties

  backRoute: string = '/app/lessons'

  @Output() eventFinishQuiz = new EventEmitter<any>;

  @Input() type: string = "";
  @Input() headerTitle: string = "";

  @Input() listWords: WordsInQuiz[] = []

  @Input() idLesson: number | undefined

  @Input() usedUserLanguages: UserLanguages | undefined

  @Input() activityType: ActivityType | undefined

  options: QuizOption[][] = []

  stateNotStarted: boolean = true;
  stateInProgress: boolean = false;
  stateFinished: boolean = false;

  lessonStates: string[] = ["START LESSON", "CONTINUE", "NEXT WORD", "FINISH LESSON", "GO BACK TO LESSONS"]
  lessonCurrentState: string = this.lessonStates[0]

  isAnswerSubmitted: boolean = false;
  isAnsweringBlocked: boolean = false;

  numberOfOptions: number = 4
  currentWordInQuiz: WordsInQuiz | undefined;
  currentCorrectOption: QuizOption | undefined;

  index: number = -1
  totalIndexWords: number = 0;

  progress: number = 0; // 0 to 1
  progressStep: number = 0;

  userActivityResult: UserActivity | undefined;
  userResults: ActivityResult[] = []

  userLevelUpdate: UserLevelUpdate | undefined;

  //#endregion

  constructor(
    private userInfoService: UserInfoService,
    private userActivityService: UserActivityService,
    private eventsService: EventsService,
    private navController: NavController,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.lessonStates = [
      this.translate.instant('lessons.quiz.states.start'),
      this.translate.instant('lessons.quiz.states.continue'),
      this.translate.instant('lessons.quiz.states.nextWord'),
      this.translate.instant('lessons.quiz.states.finishLesson'),
      this.translate.instant('lessons.quiz.states.backToLessons')]
  }

  startLesson() {
    this.lessonCurrentState = this.lessonStates[1]
    this.stateNotStarted = false
    this.stateInProgress = true

    this.progressStep = 1 / this.listWords.length

    this.initializeOptions()
    this.currentWordInQuiz = this.listWords[0]
    this.currentCorrectOption = this.options[0].filter(option => option.correct == true)[0]

    if (this.type == activityTypes[1]) { // lesson
      // this.displayLearnWord();
      this.displayQuestion() // TODO: CHANGE
    } else {
      this.displayQuestion()
    }
  }

  initializeOptions() {
    this.index = 0
    this.totalIndexWords = this.listWords.length - 1

    this.options = []

    this.listWords.forEach(wordsInQuiz => {

      let currentOptionsArray: QuizOption[] = []

      let correctOption: QuizOption = {
        idWordRef: wordsInQuiz.wordTarget.idWordRef,
        optionWordOrigin: wordsInQuiz.wordOrigin.wordString,
        optionWordTarget: wordsInQuiz.wordTarget.wordString,
        correct: true,
        pressed: false
      }
      currentOptionsArray.push(correctOption)

      while (currentOptionsArray.length < this.numberOfOptions) {
        let randomIndex = Math.floor(Math.random() * (this.listWords.length));
        let randomOption = this.listWords[randomIndex];

        let isDuplicate = currentOptionsArray.some(option => option.idWordRef === randomOption.wordTarget.idWordRef);

        if (!isDuplicate) {
          currentOptionsArray.push(
            {
              idWordRef: this.listWords[randomIndex]?.wordTarget?.idWordRef,
              optionWordOrigin: this.listWords[randomIndex]?.wordOrigin?.wordString,
              optionWordTarget: this.listWords[randomIndex]?.wordTarget?.wordString,
              correct: false,
              pressed: false
            }
          )
        }
      }
      Utils.shuffleArray(currentOptionsArray)
      this.options.push(currentOptionsArray)
    })
    console.log(this.options)
  }

  submitAnswer(answer: number) {
    if (!this.isAnsweringBlocked) {
      this.isAnsweringBlocked = true
      this.progress += this.progressStep

      if (!this.isAnswerSubmitted && !this.stateFinished) {
        this.isAnswerSubmitted = true
      }

      if (this.index === this.totalIndexWords) {
        this.lessonCurrentState = this.lessonStates[3]
      }

      this.userResults.push(
        {
          idWordRef: this.listWords[this.index].wordTarget.idWordRef,
          result: this.options[this.index][answer].correct
        }
      )
      console.log(this.userResults)
    }
  }

  submitResults() {
    let idUser = this.userInfoService.idUser

    if (idUser && this.usedUserLanguages) {
      this.userActivityResult = {
        idUser: idUser,
        userLanguages: this.usedUserLanguages,
        activityType: this.activityType,
        results: this.userResults,
        idLesson: this.idLesson ? this.idLesson : undefined
      }
      this.userActivityService.submitUserActivity(this.userActivityResult)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          userLevelUpdate => {
            this.eventsService.showSpinner$.next(true);
            this.userLevelUpdate = userLevelUpdate
            this.finishLesson()
            this.eventsService.showSpinner$.next(false);
            this.unsubscribe$.next()
          }
        )
    }
  }

  finishLesson() {
    this.stateInProgress = false
    this.stateFinished = true
    this.lessonCurrentState = this.lessonStates[4]
  }

  displayLearnWord() {

  }

  displayQuestion() {
    this.currentWordInQuiz = this.listWords[this.index]
    this.currentCorrectOption = this.options[this.index].filter(option => option.correct)[0]
    this.isAnsweringBlocked = false
  }

  nextPressed() {
    if (this.index != this.totalIndexWords) {
      this.isAnswerSubmitted = false
      this.index++;
      this.displayQuestion()
    } else {
      this.submitResults()
    }
  }

  exitView() {
    this.eventFinishQuiz.emit();
  }

  // DEBUG METHOD
  goToLastQuestion() {
    this.index = this.totalIndexWords
    this.progress = this.progressStep * this.totalIndexWords

    this.userResults = []
    this.userResults = [
      {
        "idWordRef": 2,
        "result": true
      },
      {
        "idWordRef": 3,
        "result": true
      },
      {
        "idWordRef": 6,
        "result": true
      },
      {
        "idWordRef": 7,
        "result": true
      },
      {
        "idWordRef": 8,
        "result": true
      }
    ]

    this.displayQuestion()
  }

  closeUnfinishedQuiz() {
    if (this.backRoute === "") this.navController.pop()
    else this.router.navigate([this.backRoute])
  }
}
