import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredGamePage } from './registered-game.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredGamePageRoutingModule {}
