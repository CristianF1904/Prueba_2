import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredGamePageRoutingModule } from './registered-game-routing.module';

import { RegisteredGamePage } from './registered-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisteredGamePageRoutingModule
  ],
  declarations: [RegisteredGamePage]
})
export class RegisteredGamePageModule {}
