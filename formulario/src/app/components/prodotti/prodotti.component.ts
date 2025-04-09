import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {MatDialog} from "@angular/material/dialog";
import {ProdottiService} from "../../services/prodotti.service";
import {takeUntil} from "rxjs";
import {Prodotto} from "../../models/prodotto";
import {DettaglioProdottoDialogComponent} from "../dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component";
import {Filtro} from "../../models/filtro";

@Component({
  selector: 'app-ricette',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent extends CommonListComponent implements OnInit {

  prodotti:Prodotto[] = [];
  filteredProdotti:Prodotto[] = [];
  active: boolean = false;
  filtro: Filtro = new Filtro();

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
          this.filteredProdotti = data;
          if(this.filtro.searchText){
            this.applyFiltro();
          }
          this.loader = false;
        }
      })
  }

  creaNuovo() {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogComponent, {
      width: '95%',
      data: {prodotto: new Prodotto()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveList();
      }
    });
  }

  applyFiltro() {
    const searchTextLower = this.filtro.searchText.toLowerCase();
    this.filteredProdotti = this.prodotti.filter(prodotto =>
      prodotto.nome.toLowerCase().includes(searchTextLower)
    );
  }
}
