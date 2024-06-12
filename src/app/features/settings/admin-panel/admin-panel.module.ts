import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { IonicModule } from '@ionic/angular';

import { AdminPanelPageRoutingModule } from './admin-panel-routing.module';

import { AdminPanelPage } from './admin-panel.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { MastersComponent } from './masters/masters.component';
import { UsersRelatedComponent } from './users-related/users-related.component';
import { WordsReferencesComponent } from './words-related/words-references/words-references.component';
import { WordsReferencesFormComponent } from './words-related/words-references/words-references-form/words-references-form.component';
import { DictionaryApiComponent } from './dictionary-api/dictionary-api.component';
import { WordsComponent } from './words-related/words/words.component';
import { AdminPanelComponentsHeaderComponent } from './components/admin-panel-components-header/admin-panel-components-header.component';
import { WordsFormComponent } from './words-related/words/words-form/words-form.component';
import { LibreTranslateApiComponent } from './libre-translate-api/libre-translate-api.component';
import { WordsFormAdvancedOptionsComponent } from './words-related/words/words-form/words-form-advanced-options/words-form-advanced-options.component';
import { ImagesComponent } from './images/images.component';
import { ImagesFormComponent } from './images/images-form/images-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPanelPageRoutingModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminPanelPage,
    AdminPanelComponentsHeaderComponent,
    MastersComponent,
    WordsReferencesComponent,
    WordsReferencesFormComponent,
    WordsComponent,
    WordsFormComponent,
    WordsFormAdvancedOptionsComponent,
    UsersRelatedComponent,
    ImagesComponent,
    ImagesFormComponent,
    DictionaryApiComponent,
    LibreTranslateApiComponent,
  ]
})
export class AdminPanelPageModule { }
