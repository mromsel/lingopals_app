import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';

import { LessonsPage } from './lessons.page';
import { LanguageSelectorComponent } from 'src/app/shared/components/language-selector/language-selector.component';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule
  ],
  declarations: [
    LessonsPage,
    LanguageSelectorComponent,
    AllLessonsComponent,
  ]
})
export class LessonsPageModule { }
