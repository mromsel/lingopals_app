import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelPage } from './admin-panel.page';
import { MastersComponent } from './masters/masters.component';
import { UsersRelatedComponent } from './users-related/users-related.component';
import { WordsRelatedComponent } from './words-related/words-related.component';

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
    path: 'words-related/:type',
    component: WordsRelatedComponent,
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
