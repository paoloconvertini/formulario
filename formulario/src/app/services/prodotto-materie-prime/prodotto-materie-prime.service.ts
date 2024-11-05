import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CommonService} from "../common-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProdottoMateriePrime} from "../../models/prodotto-materie-prime";

const url = environment.baseUrl + environment.PRODOTTO_MATERIE_PRIME;

@Injectable({
  providedIn: 'root'
})
export class ProdottoMateriePrimeService extends CommonService{

  constructor(http: HttpClient) {
    super(http, url);
  }

  ricettaById(id: any): Observable<any>  {
    return this.http.get<any>(this.url + `/${id}`);
  }

  salva(prodottoMateriePrimeList: ProdottoMateriePrime[]) : Observable<any>  {
    return this.http.post<any>(this.url, prodottoMateriePrimeList);
  }
}
