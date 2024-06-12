import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictionaryPage } from './dictionary.page';
import { WordDetailComponent } from './word-detail/word-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPage
  },
  {
    path: 'word-details/:id',
    component: WordDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule { }
