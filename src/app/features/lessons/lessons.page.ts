import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { LessonsService } from './services/lessons.service';
import { Subject, takeUntil } from 'rxjs';
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  lessons: Array<Lesson> = new Array();

  preferredUserLanguages: UserLanguages | undefined;

  constructor(
    private lessonsService: LessonsService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.configService.getPreferredUserLanguages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        preferredUserLanguages => this.preferredUserLanguages = preferredUserLanguages
      )

    this.lessonsService.getAllLessons()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lessons => {
        let lesson = lessons[0]
        // AUX
        for (let index = 0; index < 10; index++) {
          let auxLesson = structuredClone(lesson)
          auxLesson.idLesson = index
          auxLesson.lessonName = "Lesson " + index
          this.lessons.push(auxLesson)
        }
      })
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
