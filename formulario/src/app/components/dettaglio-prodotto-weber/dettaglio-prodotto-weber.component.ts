import {Input, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";
import {CommonListComponent} from "../commonListComponent";
import {Prodotto} from "../../models/prodotto";
import {ProdottoMateriePrimeService} from "../../services/prodotto-materie-prime/prodotto-materie-prime.service";
import {ProdottoMateriePrime} from "../../models/prodotto-materie-prime";
import {DettaglioProdottoDialogComponent} from "../dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Listino} from "../../models/listino";
import {ListiniService} from "../../services/listini.service";
import {
  ProdottoMateriePrimeWeberService
} from "../../services/weber/prodotto-materie-prime-weber/prodotto-materie-prime-weber.service";
import {
  DettaglioProdottoDialogWeberComponent
} from "../dettaglio-prodotto-dialog-weber/dettaglio-prodotto-dialog-weber.component";


@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto-weber.component.html',
  styleUrls: ['./dettaglio-prodotto-weber.component.css']
})
export class DettaglioProdottoWeberComponent extends CommonListComponent implements OnInit {

  id: any;
  prodotto: Prodotto = new Prodotto();
  prodottoMateriePrimePCList: ProdottoMateriePrime[] = [];
  prodottoMateriePrimeWeberList: ProdottoMateriePrime[] = [];
  listini: Listino[] = [];
  lavoro: ProdottoMateriePrime = new ProdottoMateriePrime();
  imballoPC: ProdottoMateriePrime = new ProdottoMateriePrime();
  imballoWe: ProdottoMateriePrime = new ProdottoMateriePrime();
  sommaPercPc: number = 0
  sommaPercWe: number = 0
  totMassaPc: number = 0
  totMassaWe: number = 0
  totMiscela20Pc: number = 0
  totMiscela20We: number = 0
  prezzo20Pc: number = 0
  prezzo20We: number = 0
  prezzoUnitarioPc: number = 0
  prezzoUnitarioWe: number = 0

  constructor(private service: ProdottoMateriePrimeWeberService, private router: ActivatedRoute,
              private dialog: MatDialog, private listinoService: ListiniService) {
    super();
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.id = params.id;
      this.getProdottoMateriePrime();
    });
  }

  modifica(prodotto: any) {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogWeberComponent, {
      width: '950%',
      data: prodotto,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProdottoMateriePrime();
        //  this.getListiniByProdotto();
      }
    });
  }

  getProdottoMateriePrime(): void {
    this.loader = true;
    this.service.ricettaById(this.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          if (data && data.length > 0) {
            this.prodotto.nome = data[0].prodottoNome;
            this.prodotto.id = data[0].prodottoId;
            this.prodotto.tipoProdotto.id = data[0].tipoProdottoId;
            this.prodotto.tipoProdotto.descrizione = data[0].tipoProdottoDescrizione;
            this.prodotto.unitMisuSacco = data[0].prodottoUnitMisuSacco;
            this.prodotto.qtaSacco = data[0].prodottoQtaSacco;
            this.prodotto.qtaPedana = data[0].prodottoQtaPedana;
            this.prodotto.updateDate = data[0].prodottoUpdateDate;
            this.prodotto.prezzoPubblico = data[0].prodottoPrezzoPubblico;
            this.prodottoMateriePrimePCList = [];
            this.prodottoMateriePrimeWeberList = [];
            this.sommaPercPc = 0
            this.sommaPercWe = 0
            this.totMassaPc = 0
            this.totMassaWe = 0
            this.totMiscela20Pc = 0
            this.totMiscela20We = 0
            this.prezzo20Pc = 0
            this.prezzo20We = 0
            this.prezzoUnitarioPc = 0
            this.prezzoUnitarioWe = 0
            data.forEach((m: any) => {
              if (m.materiaPrimaTipologia === 'LA') {
                this.lavoro = m;
              } else if (m.materiaPrimaTipologia === 'IP') {
                this.imballoPC = m;
                this.sommaPercPc += m.percentuale;
                this.totMassaPc += m.percentuale * 20;
                this.totMiscela20Pc += m.percentuale * 20 / 100;
                this.prezzo20Pc += m.materiaPrimaPrezzo * m.percentuale * 20 / 100;
                this.prezzoUnitarioPc += m.materiaPrimaPrezzo * m.percentuale / 100;
              } else if (m.materiaPrimaTipologia === 'IW') {
                this.imballoWe = m;
                this.sommaPercWe += m.percentuale;
                this.totMassaWe += m.percentuale * 20;
                this.totMiscela20We += m.percentuale * 20 / 100;
                this.prezzo20We += m.materiaPrimaPrezzo * m.percentuale * 20 / 100;
                this.prezzoUnitarioWe += m.materiaPrimaPrezzo * m.percentuale / 100;
              } else if (m.percentuale > 0) {
                if (m.materiaPrimaTipologia === 'PC') {
                  this.prodottoMateriePrimePCList.push(m);
                  this.sommaPercPc += m.percentuale;
                  this.totMassaPc += m.percentuale * 20;
                  this.totMiscela20Pc += m.percentuale * 20 / 100;
                  this.prezzo20Pc += m.materiaPrimaPrezzo * m.percentuale * 20 / 100;
                  this.prezzoUnitarioPc += m.materiaPrimaPrezzo * m.percentuale / 100;
                } else {
                  this.prodottoMateriePrimeWeberList.push(m);
                  this.sommaPercWe += m.percentuale;
                  this.totMassaWe += m.percentuale * 20;
                  this.totMiscela20We += m.percentuale * 20 / 100;
                  this.prezzo20We += m.materiaPrimaPrezzo * m.percentuale * 20 / 100;
                  this.prezzoUnitarioWe += m.materiaPrimaPrezzo * m.percentuale / 100;
                }

              }
            })
          }
          this.loader = false;
        }
      })
  }

  /*  getListiniByProdotto() {
      this.loader = true;
      this.listinoService.getAllByIdProdotto(this.id).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (data: any) => {
            if (data && data.length > 0) {
              this.listini = data;
            }
            this.loader = false;
          }
        })
    }*/
}
