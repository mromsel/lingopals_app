import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictionaryPageRoutingModule } from './dictionary-routing.module';

import { DictionaryPage } from './dictionary.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/main';
import { WordDetailComponent } from './word-detail/word-detail.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { LettersScrollComponent } from './components/letters-scroll/letters-scroll.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DictionaryPageRoutingModule,
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
    DictionaryPage,
    WordDetailComponent,
    LettersScrollComponent,
  ]
})
export class DictionaryPageModule { }
