import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommonService} from "../common-service";

const url = environment.baseUrl + environment.PRODOTTI_WEBER;

@Injectable({
  providedIn: 'root'
})
export class ProdottiWeberService extends CommonService{

  constructor(http: HttpClient) {
    super(http, url);
  }

  getAll(): Observable<any> {
      return this.http.get<any>(this.url);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  getRicetta(id: any): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getProdottiByTipo(idTipo: number): Observable<any> {
    return this.http.get<any>(this.url+`/by-tipo/${idTipo}`);
  }
}
