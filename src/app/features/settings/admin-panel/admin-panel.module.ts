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
    MastersComponent,
    WordsReferencesComponent,
    WordsReferencesFormComponent,
    UsersRelatedComponent,
  ]
})
export class AdminPanelPageModule { }
