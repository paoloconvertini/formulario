import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RicetteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
      return this.http.get<any>('/prodotti');
  }

  getRicetta(id: any): Observable<any> {
    return this.http.get<any>(`/prodotti/dettaglio/${id}`);
  }
}
