import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";
import {CommonListComponent} from "../commonListComponent";
import {RicetteService} from "../../services/ricette.service";
import {Ricetta} from "../../models/ricetta";

@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.component.html',
  styleUrls: ['./dettaglio-ricetta.component.css']
})
export class DettaglioRicettaComponent extends CommonListComponent implements OnInit{

  id:any;
  ricetta:Ricetta = new Ricetta();
  sommaPerc:number = 0
  totMassa:number = 0
  totMiscela20:number = 0
  prezzo20:number = 0
  prezzoUnitario:number = 0

  constructor(private service: RicetteService, private router: ActivatedRoute) {
    super();
    this.getRicetta();
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: any) => {
      this.id = params.id;
    });
  }

  getRicetta(): void {
    this.loader = true;
    this.service.getRicetta(this.id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.ricetta = data;
          this.ricetta.materiePrime.forEach((m) => {
            this.sommaPerc += m.percentuale;
            this.totMassa += m.percentuale*20;
            this.totMiscela20 += m.percentuale*20/100;
            this.prezzo20 += m.prezzo*m.percentuale*20/100;
            this.prezzoUnitario += m.prezzo*m.percentuale/100;
          })
          this.loader = false;
        }
      })
  }

}
