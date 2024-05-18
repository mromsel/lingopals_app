import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelPage } from './admin-panel.page';
import { MastersComponent } from './masters/masters.component';
import { UsersRelatedComponent } from './users-related/users-related.component';
import { WordsReferencesComponent } from './words-related/words-references/words-references.component';
import { WordsReferencesFormComponent } from './words-related/words-references/words-references-form/words-references-form.component';
import { WordsComponent } from './words-related/words/words.component';
import { WordsFormComponent } from './words-related/words/words-form/words-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelPage
  },
  {
    path: 'masters/:type',
    component: MastersComponent,
  },
  {
    path: 'words-related', // +'/:type'
    children: [
      {
        path: 'word-references',
        children: [
          {
            path: '',
            component: WordsReferencesComponent,
          },
          {
            path: 'form',
            component: WordsReferencesFormComponent,
          },
        ]
      },
      {
        path: 'words',
        children: [
          {
            path: '',
            component: WordsComponent,
          },
          {
            path: 'form',
            component: WordsFormComponent,
          },
        ]
      },
    ]
  },
  {
    path: 'users-related/:type',
    component: UsersRelatedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelPageRoutingModule { }
