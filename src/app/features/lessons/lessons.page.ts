import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { LessonsService } from './services/lessons.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  //TODO: CHANGE TO LESSONDISPLAY
  lessons: Array<Lesson> = new Array();

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.getLesson(1)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lesson => {

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
