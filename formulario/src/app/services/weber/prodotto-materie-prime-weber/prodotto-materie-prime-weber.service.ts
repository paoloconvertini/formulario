import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProdottoMateriePrime} from "../../../models/prodotto-materie-prime";
import {environment} from "../../../../environments/environment";
import {CommonService} from "../../common-service";

const url = environment.baseUrl + environment.PRODOTTO_MATERIE_PRIME_WEBER;

@Injectable({
  providedIn: 'root'
})
export class ProdottoMateriePrimeWeberService extends CommonService{

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
