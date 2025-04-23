import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {takeUntil} from "rxjs";
import {MateriePrimeService} from "../../services/materie-prime.service";
import {Filtro} from "../../models/filtro";
import {MateriaPrima} from "../../models/materiaPrima";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {StoricoDialogComponent} from "../storico-dialog/storico-dialog.component";
import {MateriaPrimaDto} from "../../models/materia-prima-dto";

@Component({
  selector: 'app-materie-prime',
  templateUrl: './materie-prime.component.html',
  styleUrls: ['./materie-prime.component.css']
})
export class MateriePrimeComponent extends CommonListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'prezzo', 'u.m.', 'tipologia', 'azioni'];
  isAdmin: boolean = false;
  filtro: Filtro = new Filtro();

  constructor(private service: MateriePrimeService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.retrieveList();
  }

  retrieveList(): void {
    this.loader = true;
      this.service.getAll().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (data: MateriaPrima[]) => {
            this.createPaginator(data, 100);
            if(this.filtro.searchText){
              this.applyFilter();
            }
            this.loader = false;
          }
        })
  }

  creaNuovo() {
    let mp = new MateriaPrima();
    mp.edit = true;
    this.dataSource.data.push(mp);
    this.dataSource.data = this.dataSource.data;
  }

  elimina(id: any) {
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
  }

  salva(materiaPrima: any) {
    let dto = new  MateriaPrimaDto();
    dto.nome = materiaPrima.nome;
    dto.unitaMisura = materiaPrima.unitaMisura;
    dto.prezzo = materiaPrima.prezzo;
    dto.tipologia = materiaPrima.tipologia;
    if(materiaPrima.id){
      this.service.aggiorna(dto, materiaPrima.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (res && !res.error) {
            // Trova l'indice del record originale nella lista
            const index = this.dataSource.data.findIndex((el:any) => el.id === materiaPrima.id);
            if (index !== -1) {
              this.dataSource.data[index] = { ...res, edit: false }; // aggiorna con i nuovi dati + disattiva edit
              this.dataSource._updateChangeSubscription(); // forza refresh della tabella
            }
          }
        }
      });
    } else {
      this.service.save(dto).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (res && !res.error) {
            this.retrieveList();
          }
        }
      });
    }
  }

  override applyFilter() {
    super.applyFilter(this.filtro.searchText);
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return (
        data.nome.toLowerCase().includes(filter)
      )
    }
  }

  apriStorico(materiaPrima: any) {
    const dialogRef = this.dialog.open(StoricoDialogComponent, {
      width: '30%',
      data: materiaPrima,
    });
    dialogRef.afterClosed().subscribe();
  }

}
