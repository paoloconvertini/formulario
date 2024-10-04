import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MateriePrimeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('/materie-prime');
  }

  save(param: { name: any }): Observable<any>  {
    return this.http.post<any>('/salva', param);
  }

  update(param: { name: any; id: any }): Observable<any>  {
    return this.http.put<any>('/aggionra', param);
  }

  elimina(data: any): Observable<any>  {
    return this.http.delete<any>('/elimina', data);
  }

  getStoricoPrezzi(id: any): Observable<any>  {
    return this.http.get<any>(`/storico-prezzi/${id}`);
  }
}
