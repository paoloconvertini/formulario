import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../baseComponent";
import {StoricoPrezzi} from "../../models/storicoPrezzi";
import {MateriaPrimaRegistroWeberService} from "../../services/weber/materia-prima-registro-weber.service";

interface DialogData {
  materiaPrima: any;
}

@Component({
  selector: 'app-storico-dialog',
  templateUrl: './storico-dialog-weber.component.html',
  styleUrls: ['./storico-dialog-weber.component.css']
})
export class StoricoDialogWeberComponent extends BaseComponent implements OnInit{

  loader = false;
  storicoPrezzi: StoricoPrezzi[] =  [];
  materiaPrima: any

  constructor(  private service: MateriaPrimaRegistroWeberService,  public dialogRef: MatDialogRef<StoricoDialogWeberComponent>,
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
