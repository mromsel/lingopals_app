import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/authGuard';

const routes: Routes = [
  // home
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  // lessons
  {
    path: 'lessons',
    loadChildren: () => import('./features/lessons/lessons.module').then(m => m.LessonsPageModule),
    canActivate: [AuthGuard]
  },
  // dictionary
  {
    path: 'dictionary',
    loadChildren: () => import('./features/dictionary/dictionary.module').then(m => m.DictionaryPageModule),
    canActivate: [AuthGuard]
  },
  // settings
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  // login
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginPageModule)
  },
  // signup
  {
    path: 'signup',
    loadChildren: () => import('./features/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
