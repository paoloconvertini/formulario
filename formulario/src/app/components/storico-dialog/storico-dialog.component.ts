import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {MateriePrimeService} from "../../services/materie-prime.service";
import {BaseComponent} from "../baseComponent";
import {StoricoPrezzi} from "../../models/storicoPrezzi";
import {MateriaPrimaRegistroService} from "../../services/materia-prima-registro.service";

interface DialogData {
  materiaPrima: any;
}

@Component({
  selector: 'app-storico-dialog',
  templateUrl: './storico-dialog.component.html',
  styleUrls: ['./storico-dialog.component.css']
})
export class StoricoDialogComponent extends BaseComponent implements OnInit{

  loader = false;
  storicoPrezzi: StoricoPrezzi[] =  [];
  materiaPrima: any

  constructor(  private service: MateriaPrimaRegistroService,  public dialogRef: MatDialogRef<StoricoDialogComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    super();
  }


  ngOnInit(): void {
    this.materiaPrima = this.data;
    this.getStoricoPrezzi();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getStoricoPrezzi() {
    this.loader = true;
    this.service.getStoricoPrezzi(this.materiaPrima.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.loader = false;
          this.storicoPrezzi = data;
        },
        error: (e: any) => {
          console.error(e);
          this.loader = false;
        }
      })
  }
}
