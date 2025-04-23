import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {CommonService} from "../common-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = environment.baseUrl + environment.TIPO_PRODOTTI_WEBER;

@Injectable({
  providedIn: 'root'
})
export class TipoProdottoWeberService extends CommonService{

  constructor(http: HttpClient) {
    super(http, url);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
