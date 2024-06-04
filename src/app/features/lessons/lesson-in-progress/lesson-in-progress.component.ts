import { Component, Input } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonFull } from '../interfaces/lesson-full.interface';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { EventsService } from 'src/app/shared/services/events.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';
import { activityTypes } from 'src/app/shared/interfaces/user-activity.interface';
import { WordsInQuiz } from '../interfaces/words-in-quiz.interface';
import { NavController } from '@ionic/angular';
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-lesson-in-progress',
  templateUrl: './lesson-in-progress.component.html',
  styleUrls: ['./lesson-in-progress.component.scss'],
})
export class LessonInProgressComponent {

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
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
  ) { }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('id');
      if (lessonId) {
        this.idLesson = +lessonId

        this.usedUserLanguages = this.configService.preferredUserLanguages

        this.fetchLesson()
      } else {
        this.exitView()
      }
    });


  }

  fetchLesson() {

    this.usedUserLanguages = this.userInfoService.userLanguages.filter(userLanguages => userLanguages.preferred)[0]
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
    this.router.navigate(['/app/lessons'])
  }
}
