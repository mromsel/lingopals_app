import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/shared/guards/authGuard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // home
      {
        path: 'home',
        loadChildren: () => import('../../features/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      // lessons
      {
        path: 'lessons',
        loadChildren: () => import('../../features/lessons/lessons.module').then(m => m.LessonsPageModule),
        canActivate: [AuthGuard]
      },
      // dictionary
      {
        path: 'dictionary',
        loadChildren: () => import('../../features/dictionary/dictionary.module').then(m => m.DictionaryPageModule),
        canActivate: [AuthGuard]
      },
      // settings
      {
        path: 'settings',
        loadChildren: () => import('../../features/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        // redirectTo: 'settings/admin-panel/words-related/word-references',
        // redirectTo: 'lessons',
        // redirectTo: 'dictionary',
        // redirectTo: 'dictionary/word-details/1',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
