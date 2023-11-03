import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicGamePageRoutingModule } from './public-game-routing.module';

import { PublicGamePage } from './public-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicGamePageRoutingModule
  ],
  declarations: [PublicGamePage]
})
export class PublicGamePageModule {}
