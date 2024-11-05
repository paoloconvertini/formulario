import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {MatDialog} from "@angular/material/dialog";
import {ProdottiService} from "../../services/prodotti.service";
import {takeUntil} from "rxjs";
import {Prodotto} from "../../models/prodotto";
import {DettaglioProdottoDialogComponent} from "../dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component";

@Component({
  selector: 'app-ricette',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent extends CommonListComponent implements OnInit {

  prodotti:any[] = [];
  active: boolean = false;

  constructor(private service: ProdottiService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.retrieveList();
  }

  retrieveList(): void {
    this.loader = true;
    this.service.getAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any[]) => {
          this.prodotti = data;
          this.loader = false;
        },
        error: (e: any) => {
          console.error(e);
          this.loader = false;
        }
      })
  }

  creaNuovo() {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogComponent, {
      width: '50%',
      data: {prodotto: new Prodotto()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveList();
      }
    });
  }
}
