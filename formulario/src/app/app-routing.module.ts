import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MateriePrimeComponent} from "./components/materie-prime/materie-prime.component";
import {ProdottiComponent} from "./components/prodotti/prodotti.component";
import {ListiniComponent} from "./components/listini/listini.component";
import {DettaglioProdottoComponent} from "./components/dettaglio-prodotto/dettaglio-prodotto.component";
import {ListiniDettaglioComponent} from "./components/listini-dettaglio/listini-dettaglio.component";
import {LoginComponent} from "./components/login/login.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {TipoProdottoComponent} from "./components/tipo-prodotto/tipo-prodotto.component";

const routes: Routes = [
  {
    path: 'materie-prime',
    component: MateriePrimeComponent
  },
  {
    path: 'prodotti',
    component: ProdottiComponent,
    children: [
      {
        path: 'dettaglio/:id',
        component: DettaglioProdottoComponent
      }
    ]
  },
  {
    path: 'tipo-prodotti',
    component: TipoProdottoComponent
  },
  {
    path: 'materie-prime/w',
    component: MateriePrimeComponent
  },
  {
    path: 'prodotti/w',
    component: ProdottiComponent,
    children: [
      {
        path: 'dettaglio/:id',
        component: DettaglioProdottoComponent
      }
    ]
  },
  {
    path: 'listini',
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
