import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MateriePrimeComponent} from "./components/materie-prime/materie-prime.component";
import {RicetteComponent} from "./components/ricette/ricette.component";
import {ListiniComponent} from "./components/listini/listini.component";
import {DettaglioRicettaComponent} from "./components/dettaglio-ricetta/dettaglio-ricetta.component";
import {ListiniDettaglioComponent} from "./components/listini-dettaglio/listini-dettaglio.component";
import {LoginComponent} from "./components/login/login.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: ':param/materie-prime',
    component: MateriePrimeComponent
  },
  {
    path: ':param/prodotti',
    component: RicetteComponent,
    children: [
      {
        path: 'dettaglio/:id',
        component: DettaglioRicettaComponent
      }
    ]
  },
  {
    path: ':param/listini',
    component: ListiniComponent,
    children: [
      {
        path: 'dettaglio/:id',
        component: ListiniDettaglioComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
