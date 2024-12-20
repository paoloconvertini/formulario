import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {takeUntil} from "rxjs";
import {ListiniService} from "../../services/listini.service";

@Component({
  selector: 'app-listini',
  templateUrl: './listini.component.html',
  styleUrls: ['./listini.component.css']
})
export class ListiniComponent extends CommonListComponent implements OnInit {

  listini: any[] = []

  constructor(private service: ListiniService) {
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
          this.loader = false;
        }
      })
  }

}
