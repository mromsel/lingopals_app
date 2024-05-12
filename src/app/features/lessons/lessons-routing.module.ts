import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';
import { LessonInProgressComponent } from './lesson-in-progress/lesson-in-progress.component';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { ReviewWordsComponent } from './review-words/review-words.component';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage
  },
  {
    path: 'all-lessons',
    component: AllLessonsComponent
  },
  {
    path: 'review',
    component: ReviewWordsComponent
  },
  {
    path: ':id',
    component: LessonInProgressComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule { }
