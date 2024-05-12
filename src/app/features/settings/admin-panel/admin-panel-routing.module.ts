import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelPage } from './admin-panel.page';
import { MastersComponent } from './masters/masters.component';
import { UsersRelatedComponent } from './users-related/users-related.component';
import { WordsReferencesComponent } from './words-related/words-references/words-references.component';

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
        component: WordsReferencesComponent,
      },
      // {
      //   path: 'words',
      //   component: WordsComponent,
      // },
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
