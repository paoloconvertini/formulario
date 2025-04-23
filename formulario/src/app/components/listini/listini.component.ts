import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {takeUntil} from "rxjs";
import {ListiniService} from "../../services/listini.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-listini',
  templateUrl: './listini.component.html',
  styleUrls: ['./listini.component.css']
})
export class ListiniComponent extends CommonListComponent implements OnInit {

  listini: any[] = []
  loaderData: boolean = false;
  dataValidita: any;

  constructor(private service: ListiniService, private snackBar: MatSnackBar) {
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
          this.listini = data;
          this.dataValidita = this.listini[0].dataValidita;
          this.loader = false;
        }
      })
  }

  salvaData(): void {
    this.loaderData = false;
    this.listini[0].dataValidita = this.dataValidita;
    this.service.salvaData(this.listini[0]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.loaderData = false;
          if (res && !res.error) {
            this.snackBar.open(res.msg, 'Chiudi', {
              duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
            })
          }
        }
      })
  }

}
