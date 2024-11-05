import {Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {MatDialogRef} from "@angular/material/dialog";
import {map, Observable, startWith, takeUntil} from "rxjs";
import {FormControl} from '@angular/forms';
import {MateriePrimeService} from "../../services/materie-prime.service";

@Component({
  selector: 'app-add-materia-prima-dialog',
  templateUrl: './add-materia-prima-dialog.component.html',
  styleUrls: ['./add-materia-prima-dialog.component.css']
})
export class AddMateriaPrimaDialogComponent extends CommonListComponent implements OnInit{

  myControl = new FormControl('');
  materiePrime: any = [];
  filteredOptions: Observable<any[]> | undefined;
  materiaPrima: any;

  constructor(private dialogRef: MatDialogRef<AddMateriaPrimaDialogComponent>, private service: MateriePrimeService) {
    super();
  }

  ngOnInit(): void {
    this.getMateriePrime();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getMateriePrime(): void {
    this.loader = true;
      this.service.getAll().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (data) => {
            this.materiePrime = data;
            this.loader = false;
          },
          error: (e: any) => {
            console.error(e);
            this.loader = false;
          }
        })
  }

  private _filter(value: any): any[] {
    let filterValue: string;
    if(value instanceof Object) {
      filterValue = value.nome.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.materiePrime.filter((option: { nome: string; }) => option.nome.toLowerCase().includes(filterValue));
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
      this.dialogRef.close(this.materiaPrima);
  }

  getOption(option: any) {
    return option.nome;
  }

}
