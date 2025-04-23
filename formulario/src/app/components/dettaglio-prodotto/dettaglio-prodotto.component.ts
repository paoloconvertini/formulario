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


@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrls: ['./dettaglio-prodotto.component.css']
})
export class DettaglioProdottoComponent extends CommonListComponent implements OnInit {

  id: any;
  prodotto: Prodotto = new Prodotto();
  prodottoMateriePrimeList: ProdottoMateriePrime[] = [];
  listini: Listino[] = [];
  lavoro: ProdottoMateriePrime = new ProdottoMateriePrime();
  imballo: ProdottoMateriePrime = new ProdottoMateriePrime();
  sommaPerc: number = 0
  totMassa: number = 0
  totMiscela20: number = 0
  prezzo20: number = 0
  prezzoUnitario: number = 0

  constructor(private service: ProdottoMateriePrimeService, private router: ActivatedRoute,
              private dialog: MatDialog, private listinoService: ListiniService) {
    super();
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.id = params.id;
      this.getProdottoMateriePrime();
      this.getListiniByProdotto();
    });
  }

  modifica(prodotto: any) {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogComponent, {
      width: '950%',
      data: prodotto,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProdottoMateriePrime();
        this.getListiniByProdotto();
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
            this.prodotto.tipoProdotto = data[0].tipoProdotto;
            this.prodotto.unitMisuSacco = data[0].prodottoUnitMisuSacco;
            this.prodotto.qtaSacco = data[0].prodottoQtaSacco;
            this.prodotto.qtaPedana = data[0].prodottoQtaPedana;
            this.prodotto.updateDate = data[0].prodottoUpdateDate;
            this.prodotto.prezzoPubblico = data[0].prodottoPrezzoPubblico;
            this.prodottoMateriePrimeList = [];
            this.sommaPerc = 0
            this.totMassa = 0
            this.totMiscela20 = 0
            this.prezzo20 = 0
            this.prezzoUnitario = 0
            data.forEach((m: any) => {
              if (m.materiaPrimaTipologia === 'LA') {
                this.lavoro = m;
              } else if (m.materiaPrimaTipologia === 'IM') {
                this.imballo = m;
              } else if(m.percentuale > 0){
                this.prodottoMateriePrimeList.push(m);
                this.sommaPerc += m.percentuale;
                this.totMassa += m.percentuale * 20;
                this.totMiscela20 += m.percentuale * 20 / 100;
                this.prezzo20 += m.materiaPrimaPrezzo * m.percentuale * 20 / 100;
                this.prezzoUnitario += m.materiaPrimaPrezzo * m.percentuale / 100;
              }
            })
          }
          this.loader = false;
        }
      })
  }

  getListiniByProdotto() {
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
  }
}
