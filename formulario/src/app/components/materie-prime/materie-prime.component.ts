import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {takeUntil} from "rxjs";
import {MateriePrimeService} from "../../services/materie-prime.service";
import {Filtro} from "../../models/filtro";
import {MateriaPrima} from "../../models/materiaPrima";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {StoricoDialogComponent} from "../storico-dialog/storico-dialog.component";

@Component({
  selector: 'app-materie-prime',
  templateUrl: './materie-prime.component.html',
  styleUrls: ['./materie-prime.component.css']
})
export class MateriePrimeComponent extends CommonListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'prezzo', 'u.m.', 'azioni'];
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
          next: (data: any[]) => {
            this.createPaginator(data, 100);
            if(this.filtro.searchText){
              this.applyFilter();
            }
            this.loader = false;
          },
          error: (e: any) => {
            console.error(e);
            this.loader = false;
          }
        })
  }

  creaNuovo() {
    this.dataSource.data.push(new MateriaPrima());
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
          },
          error: (e) => console.error(e)
        });
      }
    });
  }

  salva(materiaPrima: any) {
    if(materiaPrima.id){
      this.service.update({id: materiaPrima.id, name: materiaPrima.name}).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (!res.error) {
            this.retrieveList();
          }
        },
        error: (e) => console.error(e)
      });
    } else {
      this.service.save({name: materiaPrima.name}).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (!res.error) {
            this.retrieveList();
          }
        },
        error: (e) => console.error(e)
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

  apriStorico(id: any) {
    const dialogRef = this.dialog.open(StoricoDialogComponent, {
      width: '30%',
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe();
  }
}