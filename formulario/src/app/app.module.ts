import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MateriePrimeComponent } from './components/materie-prime/materie-prime.component';
import { MateriePrimeWeberComponent } from './components/materie-prime-weber/materie-prime-weber.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { ListiniComponent } from './components/listini/listini.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import { DettaglioProdottoComponent } from './components/dettaglio-prodotto/dettaglio-prodotto.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import { StoricoDialogComponent } from './components/storico-dialog/storico-dialog.component';
import {ForbiddenInterceptor} from "./interceptors/forbidden.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ListiniDettaglioComponent } from './components/listini-dettaglio/listini-dettaglio.component';
import {RouteReuseStrategy} from "@angular/router";
import {CustomRouteReuseStrategy} from "./interceptors/CustomRouteReuseStrategy";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {LoginComponent} from "./components/login/login.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {JwtModule} from "@auth0/angular-jwt";
import { DettaglioProdottoDialogComponent } from './components/dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AddMateriaPrimaDialogComponent} from "./components/add-materia-prima-dialog/add-materia-prima-dialog.component";
import { TipoProdottoComponent } from './components/tipo-prodotto/tipo-prodotto.component';
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ProdottiWeberComponent} from "./components/prodotti-weber/prodotti-weber.component";
import {TipoProdottoWeberComponent} from "./components/tipo-prodotto-weber/tipo-prodotto-weber.component";
import {
  DettaglioProdottoWeberComponent
} from "./components/dettaglio-prodotto-weber/dettaglio-prodotto-weber.component";
import {StoricoDialogWeberComponent} from "./components/storico-dialog-weber/storico-dialog-weber.component";
import {
  DettaglioProdottoDialogWeberComponent
} from "./components/dettaglio-prodotto-dialog-weber/dettaglio-prodotto-dialog-weber.component";
import {
  AddMateriaPrimaDialogWeberComponent
} from "./components/add-materia-prima-dialog-weber/add-materia-prima-dialog-weber.component";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const DateFormats = {
  parse: {
    dateInput: ['DD/MM/YYYY']
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    MateriePrimeComponent,
    MateriePrimeWeberComponent,
    ProdottiComponent,
    ProdottiWeberComponent,
    ListiniComponent,
    ConfirmDialogComponent,
    DettaglioProdottoComponent,
    DettaglioProdottoWeberComponent,
    StoricoDialogComponent,
    StoricoDialogWeberComponent,
    ListiniDettaglioComponent,
    ResetPasswordComponent,
    DettaglioProdottoDialogComponent,
    DettaglioProdottoDialogWeberComponent,
    AddMateriaPrimaDialogComponent,
    AddMateriaPrimaDialogWeberComponent,
    TipoProdottoComponent,
    TipoProdottoWeberComponent
  ],
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080', 'localhost:8081', '10.0.0.17:8080', '10.0.0.17:8081']
      }
    }),
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatTreeModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats},
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    {provide: LOCALE_ID, useValue: 'it'},
    { provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
