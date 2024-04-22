import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { LessonsService } from './services/lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  //TODO: CHANGE TO LESSONDISPLAY
  lessons: Array<Lesson> = new Array();

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.getLesson(1).subscribe(lesson => {

      // AUX
      for (let index = 0; index < 10; index++) {
        let auxLesson = structuredClone(lesson)
        auxLesson.idLesson = index
        auxLesson.lessonName = "Lesson " + index
        this.lessons.push(auxLesson)
      }
    })
  }

}
