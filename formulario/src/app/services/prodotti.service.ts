import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common-service";
import {environment} from "../../environments/environment";

const url = environment.baseUrl + environment.PRODOTTI;

@Injectable({
  providedIn: 'root'
})
export class ProdottiService extends CommonService{

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
}
