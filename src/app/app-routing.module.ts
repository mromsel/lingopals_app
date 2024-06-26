import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/authGuard';
import { LessonInProgressComponent } from './features/lessons/lesson-in-progress/lesson-in-progress.component';
import { ReviewWordsComponent } from './features/lessons/review-words/review-words.component';

const routes: Routes = [
  // app (tab bar)
  {
    path: 'app',
    loadChildren: () => import('./features/tabs/tabs.module').then(m => m.TabsPageModule),
    // canActivate: [AuthGuard]
  },
  // introduction page
  {
    path: 'intro',
    loadChildren: () => import('./features/introduction/introduction.module').then(m => m.IntroductionPageModule)
  },
  // tutorial
  {
    path: 'tutorial',
    loadChildren: () => import('./features/tutorial/tutorial.module').then(m => m.TutorialPageModule)
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
    path: 'app/lessons/review',
    component: ReviewWordsComponent,
    pathMatch: 'full'
  },
  {
    path: 'app/lessons/:id',
    component: LessonInProgressComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./features/test/test.module').then(m => m.TestPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
