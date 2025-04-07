import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MateriaPrima} from "../../models/materiaPrima";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../baseComponent";
import {MateriePrimeService} from "../../services/materie-prime.service";
import {MateriaPrimaDto} from "../../models/materia-prima-dto";
import {ProdottoMateriePrimeService} from "../../services/prodotto-materie-prime/prodotto-materie-prime.service";
import {ProdottoMateriePrime} from "../../models/prodotto-materie-prime";
import {AddMateriaPrimaDialogComponent} from "../add-materia-prima-dialog/add-materia-prima-dialog.component";
import {TipoProdottoService} from "../../services/tipo-prodotto.service";
import {TipoProdotto} from "../../models/tipo-prodotto";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface DialogData {
  prodotto: any;
}

@Component({
  selector: 'app-dettaglio-prodotto-dialog',
  templateUrl: './dettaglio-prodotto-dialog.component.html',
  styleUrls: ['./dettaglio-prodotto-dialog.component.css']
})
export class DettaglioProdottoDialogComponent extends BaseComponent implements OnInit{

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

  constructor(    public dialogRef: MatDialogRef<DettaglioProdottoDialogComponent>,
                  private materiePrimeService: MateriePrimeService,
                  private service: ProdottoMateriePrimeService,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData,
                  private tipoProdottiService: TipoProdottoService,
                  private dialog: MatDialog, private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.prodotto = this.data;
    if(this.prodotto && this.prodotto.id && this.prodotto.id !== 0) {
      this.getTipoProdotti();
    }
  }

  compareFn(x: TipoProdotto, y: TipoProdotto): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  cercaMateriaPrima(prodottoMateriePrime: ProdottoMateriePrime) {
    const dialogRef = this.dialog.open(AddMateriaPrimaDialogComponent, {
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
    this.loader = true;
    if(!this.prodottoMateriePrimeList[0].prodottoId || this.prodottoMateriePrimeList[0].prodottoId === 0) {
      this.prodottoMateriePrimeList[0].prodottoNome = this.prodotto.nome;
    }
    this.prodottoMateriePrimeList[0].tipoProdottoId = this.prodotto.tipoProdotto.id;
    this.prodottoMateriePrimeList[0].tipoProdottoDescrizione = this.prodotto.tipoProdotto.descrizione;
    this.prodottoMateriePrimeList[0].prodottoUnitMisuSacco = this.prodotto.unitMisuSacco;
    this.prodottoMateriePrimeList[0].prodottoQtaSacco = this.prodotto.qtaSacco;
    this.prodottoMateriePrimeList[0].prodottoQtaPedana = this.prodotto.qtaPedana;
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
          this.getProdottoMateriePrime();
        }
      })
  }

}
