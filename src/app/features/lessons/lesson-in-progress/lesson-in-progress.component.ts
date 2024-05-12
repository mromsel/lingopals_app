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
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-lesson-in-progress',
  templateUrl: './lesson-in-progress.component.html',
  styleUrls: ['./lesson-in-progress.component.scss'],
})
export class LessonInProgressComponent {

  backRoute: string = '/lessons'

  lessonType: string = activityTypes[1]

  listWords: WordsInQuiz[] = []
  usedUserLanguages: UserLanguages | undefined

  // --------------------

  @Input() lessonInput: Lesson | undefined;

  idLesson: number | undefined;
  lesson: LessonFull | undefined;

  constructor(
    private eventsService: EventsService,
    private lessonsService: LessonsService,
    private userInfoService: UserInfoService,
    private userActivityService: UserActivityService,
    private configService: ConfigService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
  ) { }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('id');
      if (lessonId) {
        this.idLesson = +lessonId

        this.configService.getPreferredUserLanguages().subscribe(
          userLanguages => this.usedUserLanguages = userLanguages
        )
        this.fetchLesson()
      } else {
        this.exitView()
      }
    });


  }

  fetchLesson() {

    this.usedUserLanguages = this.userInfoService.userInfo?.userLanguages.filter(userLanguages => userLanguages.preferred)[0]
    if (this.idLesson && this.usedUserLanguages) {

      this.lessonsService.getLesson(this.idLesson, this.usedUserLanguages).subscribe(lesson => {
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
