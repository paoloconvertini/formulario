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
import {MateriePrimeWeberComponent} from "./components/materie-prime-weber/materie-prime-weber.component";
import {TipoProdottoWeberComponent} from "./components/tipo-prodotto-weber/tipo-prodotto-weber.component";
import {
  DettaglioProdottoWeberComponent
} from "./components/dettaglio-prodotto-weber/dettaglio-prodotto-weber.component";
import {ProdottiWeberComponent} from "./components/prodotti-weber/prodotti-weber.component";

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
    path: 'tipo-prodotti-weber',
    component: TipoProdottoWeberComponent
  },
  {
    path: 'materie-prime-weber',
    component: MateriePrimeWeberComponent
  },
  {
    path: 'prodotti-weber',
    component: ProdottiWeberComponent,
    children: [
      {
        path: 'dettaglio/:id',
        component: DettaglioProdottoWeberComponent
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
