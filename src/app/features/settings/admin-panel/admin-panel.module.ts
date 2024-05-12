import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPanelPageRoutingModule } from './admin-panel-routing.module';

import { AdminPanelPage } from './admin-panel.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { MastersComponent } from './masters/masters.component';
import { UsersRelatedComponent } from './users-related/users-related.component';
import { WordsRelatedComponent } from './words-related/words-related.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPanelPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminPanelPage,
    MastersComponent,
    WordsRelatedComponent,
    UsersRelatedComponent,
  ]
})
export class AdminPanelPageModule { }
