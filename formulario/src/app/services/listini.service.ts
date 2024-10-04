import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListiniService {

  constructor(private http: HttpClient) { }

  getRicavi(): Observable<any> {
    return this.http.get<any>('ricavi');
  }

  getListino(id: any) : Observable<any> {
    return this.http.get<any>(`/listini/dettaglio/${id}`);
  }
}
