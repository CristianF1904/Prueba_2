import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),...canActivate(() => redirectUnauthorizedTo(['/crear-usuario']))
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'crear-juego',
    loadChildren: () => import('./crear-juego/crear-juego.module').then( m => m.CrearJuegoPageModule),...canActivate(() => redirectUnauthorizedTo(['/crear-usuario']))
  },
  {
    path: 'public-game',
    loadChildren: () => import('./public-game/public-game.module').then( m => m.PublicGamePageModule),...canActivate(() => redirectUnauthorizedTo(['/crear-usuario']))
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },
  {
    path: 'registered-game',
    loadChildren: () => import('./registered-game/registered-game.module').then( m => m.RegisteredGamePageModule),...canActivate(() => redirectUnauthorizedTo(['/crear-usuario']))
  },  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
