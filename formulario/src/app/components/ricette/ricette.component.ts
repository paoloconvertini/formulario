import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {MatDialog} from "@angular/material/dialog";
import {RicetteService} from "../../services/ricette.service";
import {takeUntil} from "rxjs";
import {Ricetta} from "../../models/ricetta";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DettaglioRicettaDialogComponent} from "../dettaglio-ricetta-dialog/dettaglio-ricetta-dialog.component";

@Component({
  selector: 'app-ricette',
  templateUrl: './ricette.component.html',
  styleUrls: ['./ricette.component.css']
})
export class RicetteComponent extends CommonListComponent implements OnInit {

  colle:any[] = [];
  cementi:any[] = [];
  ricette:any[] = [];
  active: boolean = false;

  constructor(private service: RicetteService, private dialog: MatDialog) {
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
          this.ricette = data;
          data.forEach(el => {
            if(el.categoria === 1) {
              this.cementi.push(el);
            } else if(el.categoria === 2) {
              this.colle.push(el);
            }
          })
          this.loader = false;
        },
        error: (e: any) => {
          console.error(e);
          this.loader = false;
        }
      })
  }

  modifica(ricetta: any) {
    const dialogRef = this.dialog.open(DettaglioRicettaDialogComponent, {
      width: '30%',
      data: {ricetta: ricetta},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveList();
      }
    });
  }

  creaNuovo() {
    const dialogRef = this.dialog.open(DettaglioRicettaDialogComponent, {
      width: '30%',
      data: {ricetta: new Ricetta()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveList();
      }
    });
  }
}
