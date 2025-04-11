import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {ActivatedRoute} from "@angular/router";
import {ListiniService} from "../../services/listini.service";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TipoProdottoPdfDto} from "../../models/TipoProdottoPdfDto";

@Component({
  selector: 'app-listini-dettaglio',
  templateUrl: './listini-dettaglio.component.html',
  styleUrls: ['./listini-dettaglio.component.css']
})
export class ListiniDettaglioComponent extends CommonListComponent implements OnInit{

  id:any;
  listini:TipoProdottoPdfDto[] = [];

  constructor(private service: ListiniService, private router: ActivatedRoute, private snackBar: MatSnackBar) {
    super();

  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.id = params.id;
      this.getListiniByIdValoreListino();
    });
  }

  getListiniByIdValoreListino() {
     this.loader = true;
     this.service.getListiniByIdValoreListino(this.id).pipe(takeUntil(this.ngUnsubscribe))
       .subscribe({
         next: (data: any) => {
           this.listini = data;
           this.loader = false;
         }
       })
  }

  generaListino(iva: any) {
    this.loader = true;
    this.service.generaListino(this.id, iva).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.loader = false;
          if (data) {
            let a: any = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            let blob = new Blob([data], { type: 'application/pdf' });
            let url= window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'Listino_' + this.id + '.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            this.snackBar.open('Errore', 'Chiudi', {
              duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'
            });
          }
        }
      })
  }

  stampaListino(iva: any) {
    this.loader = true;
    this.service.generaListino(this.id, iva).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          if (data) {
            let blob = new Blob([data], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(blob);

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none'; // nasconde l'iframe
            iframe.src = fileURL;

            document.body.appendChild(iframe);

            iframe.onload = () => {
              iframe.contentWindow?.focus();
              iframe.contentWindow?.print();
            };
          }
          this.loader = false;
        }
      })
  }
}
