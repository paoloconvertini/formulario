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

  constructor(    public dialogRef: MatDialogRef<DettaglioProdottoDialogComponent>,
                  private materiePrimeService: MateriePrimeService,
                  private service: ProdottoMateriePrimeService,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData,
                  private dialog: MatDialog ) {
    super();
  }

  ngOnInit(): void {
    this.prodotto = this.data;
    if(this.prodotto && this.prodotto.id && this.prodotto.id !== 0) {
      this.getProdottoMateriePrime();
    }
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
    this.loader = true;
    if(this.sommaPerc > 100) {
      this.msg = 'ATTENZIONE! La percentuale degli additivi è maggiore del 100%';
      this.showMsq = true;
      return;
    }
    this.service.salva(this.prodottoMateriePrimeList).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          this.loader = false;
          if (res && !res.error) {
            this.dialogRef.close(true);
          }
        }
      });
    }

  add() {
    this.prodottoMateriePrimeList.push(new ProdottoMateriePrime());
  }

  calcolaSomma() {
    this.sommaPerc = 0;
    this.prodottoMateriePrimeList.forEach((m: any) => {
      this.sommaPerc += m.percentuale;
    })
    this.showMsq = false;
  }
}
