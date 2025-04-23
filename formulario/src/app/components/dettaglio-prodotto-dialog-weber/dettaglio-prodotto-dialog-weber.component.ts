import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../baseComponent";
import {ProdottoMateriePrime} from "../../models/prodotto-materie-prime";
import {TipoProdotto} from "../../models/tipo-prodotto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MateriePrimeWeberService} from "../../services/weber/materie-prime-weber.service";
import {
  ProdottoMateriePrimeWeberService
} from "../../services/weber/prodotto-materie-prime-weber/prodotto-materie-prime-weber.service";
import {TipoProdottoWeberService} from "../../services/weber/tipo-prodotto-weber.service";
import {
  AddMateriaPrimaDialogWeberComponent
} from "../add-materia-prima-dialog-weber/add-materia-prima-dialog-weber.component";

export interface DialogData {
  prodotto: any;
}

@Component({
  selector: 'app-dettaglio-prodotto-dialog',
  templateUrl: './dettaglio-prodotto-dialog-weber.component.html',
  styleUrls: ['./dettaglio-prodotto-dialog-weber.component.css']
})
export class DettaglioProdottoDialogWeberComponent extends BaseComponent implements OnInit{

  loader = false;
  prodotto:any;
  sommaPerc:number = 0
  prodottoMateriePrimeList: ProdottoMateriePrime[] = [];
  loadingMp: boolean = false;
  materiePrime: any = [];
  msg: string = '';
  showMsq: boolean = false;
  tipoProdotti: any;
  tipoProdotto: any;
  unitMisuSacco: any;
  qtaSacco: any;

  constructor(    public dialogRef: MatDialogRef<DettaglioProdottoDialogWeberComponent>,
                  private materiePrimeService: MateriePrimeWeberService,
                  private service: ProdottoMateriePrimeWeberService,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData,
                  private tipoProdottiService: TipoProdottoWeberService,
                  private dialog: MatDialog, private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.prodotto = this.data;
    this.getTipoProdotti();
  }

  compareFn(x: TipoProdotto, y: TipoProdotto): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  cercaMateriaPrima(prodottoMateriePrime: ProdottoMateriePrime) {
    const dialogRef = this.dialog.open(AddMateriaPrimaDialogWeberComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       prodottoMateriePrime.materiaPrimaId = result.id;
       prodottoMateriePrime.materiaPrimaNome = result.nome;
       prodottoMateriePrime.materiaPrimaTipologia = result.tipologia;
       prodottoMateriePrime.materiaPrimaPrezzo = result.prezzo;
      }
    });
  }

  getProdottoMateriePrime(): void {
    this.loader = true;
    this.service.ricettaById(this.prodotto.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.prodottoMateriePrimeList = data;
          this.prodottoMateriePrimeList.forEach((m: any) => {
            this.sommaPerc += m.percentuale;
          })
          this.loader = false;
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salva() {
    if(this.sommaPerc > 100) {
      this.snackBar.open('ATTENZIONE! La percentuale degli additivi è maggiore del 100%', 'Chiudi', {
        duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom'
      })
      return;
    }

    this.prodottoMateriePrimeList[0].prodottoNome = this.prodotto.nome;
    this.prodottoMateriePrimeList[0].tipoProdottoId = this.prodotto.tipoProdotto.id;
    this.prodottoMateriePrimeList[0].tipoProdottoDescrizione = this.prodotto.tipoProdotto.descrizione;
    this.prodottoMateriePrimeList[0].prodottoUnitMisuSacco = this.prodotto.unitMisuSacco;
    this.prodottoMateriePrimeList[0].prodottoQtaSacco = this.prodotto.qtaSacco;
    this.prodottoMateriePrimeList[0].prodottoQtaPedana = this.prodotto.qtaPedana;
    this.prodottoMateriePrimeList[0].prodottoPrezzoPubblico = this.prodotto.prezzoPubblico;

    let error = false;
    this.prodottoMateriePrimeList.forEach(m => {
      if(!m.materiaPrimaNome){
        error = true;
      }
    })
    if(error) {
      return;
    }
    this.loader = true;
    this.service.salva(this.prodottoMateriePrimeList).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          this.loader = false;
          if (res && !res.error) {
            this.dialogRef.close(true);
            this.snackBar.open(res.msg, 'Chiudi', {
              duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
            })
          } else {
            this.dialogRef.close();
          }
        }
      });
    }

  add() {
    this.prodottoMateriePrimeList.push(new ProdottoMateriePrime());
  }

  calcolaSomma() {
    this.sommaPerc = 0;
    this.prodottoMateriePrimeList.filter(m => m.percentuale).forEach((m: any) => {
      this.sommaPerc += m.percentuale;
    })
    this.showMsq = false;
  }

  getTipoProdotti(): void {
    this.tipoProdottiService.getAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: TipoProdotto[]) => {
          this.tipoProdotti = data;
          if(this.prodotto && this.prodotto.id && this.prodotto.id !== 0) {
            this.getProdottoMateriePrime();
          }
        }
      })
  }

}
