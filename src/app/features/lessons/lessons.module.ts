import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';

import { LessonsPage } from './lessons.page';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { LessonInProgressComponent } from './lesson-in-progress/lesson-in-progress.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/main';
import { ReviewWordsComponent } from './review-words/review-words.component';
import { QuizHeaderComponent } from './components/quiz/quiz-header/quiz-header.component';
import { QuizStartCardComponent } from './components/quiz/quiz-start-card/quiz-start-card.component';
import { QuizFinishedCardComponent } from './components/quiz/quiz-finished-card/quiz-finished-card.component';
import { QuizLearnWordComponent } from './components/quiz/quiz-learn-word/quiz-learn-word.component';
import { QuizOptionsQuestionComponent } from './components/quiz/quiz-options-question/quiz-options-question.component';
import { QuizComponent } from './components/quiz/quiz/quiz.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    LessonsPage,
    AllLessonsComponent,
    LessonInProgressComponent,
    ReviewWordsComponent,
    QuizComponent,
    QuizHeaderComponent,
    QuizStartCardComponent,
    QuizFinishedCardComponent,
    QuizLearnWordComponent,
    QuizOptionsQuestionComponent,
  ]
})
export class LessonsPageModule { }
