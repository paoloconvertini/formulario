import {Input, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";
import {CommonListComponent} from "../commonListComponent";
import {Prodotto} from "../../models/prodotto";
import {ProdottoMateriePrimeService} from "../../services/prodotto-materie-prime/prodotto-materie-prime.service";
import {ProdottoMateriePrime} from "../../models/prodotto-materie-prime";
import {DettaglioProdottoDialogComponent} from "../dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrls: ['./dettaglio-prodotto.component.css']
})
export class DettaglioProdottoComponent extends CommonListComponent implements OnInit{

  id:any;
  prodotto:Prodotto = new Prodotto();
  prodottoMateriePrimeList: ProdottoMateriePrime[] = [];
  sommaPerc:number = 0
  totMassa:number = 0
  totMiscela20:number = 0
  prezzo20:number = 0
  prezzoUnitario:number = 0

  constructor(private service: ProdottoMateriePrimeService, private router: ActivatedRoute, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.id = params.id;
      this.getProdottoMateriePrime();
    });
  }

  modifica(prodotto: any) {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogComponent, {
      width: '50%',
      data: prodotto,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProdottoMateriePrime();
      }
    });
  }

  getProdottoMateriePrime(): void {
    this.loader = true;
    this.service.ricettaById(this.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.prodottoMateriePrimeList = data;
          if(this.prodottoMateriePrimeList.length > 0) {
            this.prodotto.nome = this.prodottoMateriePrimeList[0].prodottoNome;
            this.prodotto.id = this.prodottoMateriePrimeList[0].prodottoId;
            this.prodottoMateriePrimeList.forEach((m) => {
              this.sommaPerc += m.percentuale;
              this.totMassa += m.percentuale*20;
              this.totMiscela20 += m.percentuale*20/100;
              this.prezzo20 += m.materiaPrimaPrezzo*m.percentuale*20/100;
              this.prezzoUnitario += m.materiaPrimaPrezzo*m.percentuale/100;
            })
          }


          this.loader = false;
        }
      })
  }

}
