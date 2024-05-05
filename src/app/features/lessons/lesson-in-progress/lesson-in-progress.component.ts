import { Component, Input, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonFull, WordsInLesson } from '../interfaces/lesson-full.interface';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { EventsService } from 'src/app/shared/services/events.service';
import { Utils } from 'src/app/shared/utils/utils';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { UserActivity, activityTypes } from 'src/app/shared/interfaces/user-activity.interface';
import { UserActivityService } from 'src/app/shared/services/user-activity.service';

export interface Option {
  idWordRef: number,
  option: string,
  correct: boolean,
  pressed: boolean,
}

@Component({
  selector: 'app-lesson-in-progress',
  templateUrl: './lesson-in-progress.component.html',
  styleUrls: ['./lesson-in-progress.component.scss'],
})
export class LessonInProgressComponent implements OnInit {

  backRoute: string = '/lessons'

  @Input() lessonInput: Lesson | undefined;

  idLesson: number | undefined;
  lesson: LessonFull | undefined;

  lessonStates: string[] = ["START LESSON", "NEXT WORD", "FINISH LESSON"]
  lessonCurrentState: string = this.lessonStates[0]

  numberOfOptions: number = 4
  options: Option[] = []
  correctOption: WordsInLesson | undefined;

  index: number = -1
  totalIndexWords: number = 0;

  answerSubmitted: boolean = false;
  isLessonStarted: boolean = false;
  isLessonFinished: boolean = false;

  progress: number = 0; // 0 to 1
  progressStep: number = 0;

  constructor(
    private eventsService: EventsService,
    private lessonsService: LessonsService,
    private userInfoService: UserInfoService,
    private userActivityService: UserActivityService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('id');
      if (lessonId) {
        this.idLesson = +lessonId
        this.fetchLesson()
      } else {
        this.exitView()
      }
    });
  }

  fetchLesson() {
    this.resetLesson()
    if (this.idLesson) {

      this.lessonsService.getLesson(this.idLesson, this.userInfoService.getUserLanguages()[0]).subscribe(lesson => {
        this.eventsService.showSpinner$.next(true);
        this.lesson = lesson
        this.totalIndexWords = lesson.wordsList.length - 1
        this.progressStep = 1 / lesson.wordsList.length
        this.eventsService.showSpinner$.next(false);
      })
    }
  }

  startLesson() {
    this.lessonCurrentState = this.lessonStates[1]
    this.isLessonStarted = true
    this.displayQuestion()
  }

  displayQuestion() {
    if (this.lesson && (this.index <= this.totalIndexWords)) {
      this.options = []
      let wordsList = this.lesson.wordsList

      this.correctOption = wordsList[this.index]
      let correctOption = {
        option: wordsList[this.index].wordTarget.wordString,
        idWordRef: wordsList[this.index].wordTarget.idWordRef,
        correct: true,
        pressed: false
      }
      this.options.push(correctOption)

      while (this.options.length < this.numberOfOptions) {
        let randomIndex = Math.floor(Math.random() * (wordsList.length));
        let randomOption = wordsList[randomIndex];

        let isDuplicate = this.options.some(option => option.idWordRef === randomOption.wordTarget.idWordRef);

        if (!isDuplicate) {
          this.options.push(
            {
              option: wordsList[randomIndex]?.wordTarget?.wordString,
              idWordRef: wordsList[randomIndex]?.wordTarget?.idWordRef,
              correct: false,
              pressed: false
            }
          )
        }
      }
      Utils.shuffleArray(this.options)
    }
  }

  checkOption(optionIndex: number) {
    if (!this.answerSubmitted && !this.isLessonFinished) {
      this.answerSubmitted = true
      this.options[optionIndex].pressed = true
    }
    if (this.index === this.totalIndexWords) {
      this.progress += this.progressStep
      this.finishLesson()
    }
  }

  goToNextQuestion() {
    if (this.index != this.totalIndexWords) {
      this.answerSubmitted = false
      this.index++;
      this.progress += this.progressStep
      this.displayQuestion()
    }
  }

  finishLesson() {
    this.isLessonFinished = true
    this.isLessonStarted = false //???
    this.lessonCurrentState = this.lessonStates[2]
    console.log("Finished lesson :)")

    let userActivity: UserActivity;
    let idUser = this.userInfoService.idUser
    if (idUser) {
      userActivity = {
        idUserActivity: 0,
        type: activityTypes[1],
        idUser: idUser,
        idLesson: this.lesson?.idLesson
      }

      this.userActivityService.submitUserActivity(userActivity).subscribe(
        response => console.log(response)
      )
    }
  }

  exitView() {
    this.router.navigate(['/lessons'])
  }

  // goBack() {
  //   this.resetLesson()
  //   this.router.navigate(['/lessons'])
  // }

  resetLesson() {
    this.index = 0
    this.answerSubmitted = false
    this.isLessonStarted = false
    this.isLessonFinished = false
  }

  // DEBUG METHOD
  goToLastQuestion() {
    this.index = this.totalIndexWords
    this.progress = this.progressStep * this.totalIndexWords
    this.displayQuestion()
  }
}
