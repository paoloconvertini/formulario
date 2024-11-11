import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {ProdottiService} from "../../services/prodotti.service";
import {ActivatedRoute} from "@angular/router";
import {ListiniService} from "../../services/listini.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-listini-dettaglio',
  templateUrl: './listini-dettaglio.component.html',
  styleUrls: ['./listini-dettaglio.component.css']
})
export class ListiniDettaglioComponent extends CommonListComponent implements OnInit{

  id:any;
  listini:any;

  constructor(private service: ListiniService, private router: ActivatedRoute) {
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

  generaListino() {
      alert("GENERO LISTNO 20!");
  }
}
