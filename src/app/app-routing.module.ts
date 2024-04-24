import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/authGuard';
import { LoginPage } from './features/login/login.page';

const routes: Routes = [
  // app (tab bar)
  {
    path: 'app',
    loadChildren: () => import('./features/tabs/tabs.module').then(m => m.TabsPageModule),
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
    redirectTo: 'app',
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
