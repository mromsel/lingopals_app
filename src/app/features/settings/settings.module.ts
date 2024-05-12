import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/main';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MastersComponent } from './admin-panel/masters/masters.component';
import { WordsRelatedComponent } from './admin-panel/words-related/words-related.component';
import { UsersRelatedComponent } from './admin-panel/users-related/users-related.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule,
  ],
  declarations: [
    SettingsPage,
    AdminPanelComponent,
    MastersComponent,
    WordsRelatedComponent,
    UsersRelatedComponent,
  ]
})
export class SettingsPageModule { }
