import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';

import { LessonsPage } from './lessons.page';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { LessonInProgressComponent } from './lesson-in-progress/lesson-in-progress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    LessonsPage,
    AllLessonsComponent,
    LessonInProgressComponent
  ]
})
export class LessonsPageModule { }
