import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {Filtro} from "../../models/filtro";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {MateriaPrima} from "../../models/materiaPrima";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MateriaPrimaDto} from "../../models/materia-prima-dto";
import {TipoProdottoService} from "../../services/tipo-prodotto.service";
import {TipoProdotto} from "../../models/tipo-prodotto";

@Component({
  selector: 'app-tipo-prodotto',
  templateUrl: './tipo-prodotto.component.html',
  styleUrls: ['./tipo-prodotto.component.css']
})
export class TipoProdottoComponent extends CommonListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'azioni'];
  isAdmin: boolean = false;
  filtro: Filtro = new Filtro();

  constructor(private service: TipoProdottoService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.retrieveList();
  }

  retrieveList(): void {
    this.loader = true;
    this.service.getAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: TipoProdotto[]) => {
          this.createPaginator(data, 100);
          if (this.filtro.searchText) {
            this.applyFilter();
          }
          this.loader = false;
        }
      })
  }

  creaNuovo() {
    let tp = new TipoProdotto();
    tp.edit = true;
    this.dataSource.data.push(tp);
    this.dataSource.data = this.dataSource.data;
  }

/*  elimina(id: any) {
    this.openConfirmDialog(null, null, id);
  }

  openConfirmDialog(extraProp: any, preProp: any, data: any) {
    let msg = '';
    if (preProp) {
      msg += preProp;
    }
    msg += 'Sei sicuro di voler eliminare questa materia prima. L\'azione è irreversibile.';
    if (extraProp) {
      msg += " ";
      msg += extraProp;
    }
    msg += '?';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {msg: msg},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.elimina(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
          next: (res) => {
            if (!res.error) {
              this.retrieveList();
            }
          }
        });
      }
    });
  }*/

  salva(materiaPrima: any) {
    this.loader = true;
      this.service.save(materiaPrima).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          this.loader = false;
          if (!res.error) {
            this.retrieveList();
          }
        }
      });
  }


  override applyFilter() {
    super.applyFilter(this.filtro.searchText);
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return (
        data.descrizione.toLowerCase().includes(filter)
      )
    }
  }

}
