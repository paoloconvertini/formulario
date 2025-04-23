import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {Filtro} from "../../models/filtro";
import {takeUntil} from "rxjs";
import {TipoProdotto} from "../../models/tipo-prodotto";
import {TipoProdottoWeberService} from "../../services/weber/tipo-prodotto-weber.service";

@Component({
  selector: 'app-tipo-prodotto',
  templateUrl: './tipo-prodotto-weber.component.html',
  styleUrls: ['./tipo-prodotto-weber.component.css']
})
export class TipoProdottoWeberComponent extends CommonListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'azioni'];
  isAdmin: boolean = false;
  filtro: Filtro = new Filtro();

  constructor(private service: TipoProdottoWeberService) {
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

  salva(tp: any) {
    this.loader = true;
      this.service.save(tp).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          this.loader = false;
          if (res && !res.error) {
            if(tp.id) {
              const index = this.dataSource.data.findIndex((el:any) => el.id === tp.id);
              if (index !== -1) {
                this.dataSource.data[index] = { ...res, edit: false }; // aggiorna con i nuovi dati + disattiva edit
                this.dataSource._updateChangeSubscription(); // forza refresh della tabella
              }
            } else {
              this.retrieveList();
            }
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
