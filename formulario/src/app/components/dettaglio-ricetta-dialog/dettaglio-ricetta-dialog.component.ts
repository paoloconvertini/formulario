import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MateriaPrima} from "../../models/materiaPrima";
import {Ricetta} from "../../models/ricetta";
import {takeUntil} from "rxjs";
import {RicetteService} from "../../services/ricette.service";
import {BaseComponent} from "../baseComponent";
import {MateriePrimeService} from "../../services/materie-prime.service";

export interface DialogData {
  ricetta: any;
}

@Component({
  selector: 'app-dettaglio-ricetta-dialog',
  templateUrl: './dettaglio-ricetta-dialog.component.html',
  styleUrls: ['./dettaglio-ricetta-dialog.component.css']
})
export class DettaglioRicettaDialogComponent extends BaseComponent implements OnInit{

  loader = false;
  ricetta: any;
  sommaPerc:number = 0

  constructor(    public dialogRef: MatDialogRef<DettaglioRicettaDialogComponent>,
                  private materiePrimeService: MateriePrimeService,
                  private service: RicetteService,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    super();
  }

  ngOnInit(): void {
    this.ricetta = this.data.ricetta;
    this.getRicetta();
  }

  getRicetta(): void {
    this.loader = true;
    this.sommaPerc = 0;
    this.service.getRicetta(this.ricetta.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.ricetta = data;
          this.ricetta.materiePrime.forEach((m: any) => {
            this.sommaPerc += m.percentuale;
          })
          this.loader = false;
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salva(materiaPrima: any) {
    if(materiaPrima.id){
      this.materiePrimeService.update({id: materiaPrima.id, name: materiaPrima.name}).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (!res.error) {
            this.getRicetta();
          }
        },
        error: (e) => console.error(e)
      });
    } else {
      this.materiePrimeService.save({name: materiaPrima.name}).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (!res.error) {
            this.getRicetta();
          }
        },
        error: (e) => console.error(e)
      });
    }
  }

  add() {
    this.ricetta.materiePrime.push(new MateriaPrima());
  }
}
