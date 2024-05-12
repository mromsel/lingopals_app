import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MastersComponent } from './admin-panel/masters/masters.component';
import { UsersRelatedComponent } from './admin-panel/users-related/users-related.component';
import { WordsRelatedComponent } from './admin-panel/words-related/words-related.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
  },
  {
    path: 'admin-panel/masters/:type',
    component: MastersComponent,
  },
  {
    path: 'admin-panel/words-related/:type',
    component: WordsRelatedComponent,
  },
  {
    path: 'admin-panel/users-related/:type',
    component: UsersRelatedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule { }
