import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { LessonsService } from '../services/lessons.service';

@Component({
  selector: 'app-all-lessons',
  templateUrl: './all-lessons.component.html',
  styleUrls: ['./all-lessons.component.scss'],
})
export class AllLessonsComponent implements OnInit {

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
