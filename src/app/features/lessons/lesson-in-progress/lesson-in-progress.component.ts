import { Component, Input, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonFull } from '../interfaces/lesson-full.interface';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { EventsService } from 'src/app/shared/services/events.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { activityTypes } from 'src/app/shared/interfaces/user-activity.interface';
import { UserActivityService } from 'src/app/shared/services/user-activity.service';
import { WordsInQuiz } from '../interfaces/words-in-quiz.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lesson-in-progress',
  templateUrl: './lesson-in-progress.component.html',
  styleUrls: ['./lesson-in-progress.component.scss'],
})
export class LessonInProgressComponent implements OnInit {

  backRoute: string = '/lessons'

  lessonType: string = activityTypes[1]

  listWords: WordsInQuiz[] = []

  // --------------------

  @Input() lessonInput: Lesson | undefined;

  idLesson: number | undefined;
  lesson: LessonFull | undefined;

  constructor(
    private eventsService: EventsService,
    private lessonsService: LessonsService,
    private userInfoService: UserInfoService,
    private userActivityService: UserActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
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
    if (this.idLesson) {

      this.lessonsService.getLesson(this.idLesson, this.userInfoService.getUserLanguages()[0]).subscribe(lesson => {
        this.eventsService.showSpinner$.next(true);
        this.lesson = lesson

        this.listWords = this.lesson.wordsList

        this.eventsService.showSpinner$.next(false);
      })
    }
  }

  exitView() {
    this.navController.pop()
    // this.navController.navigateBack()
    this.router.navigate(['/lessons'])
  }

}
