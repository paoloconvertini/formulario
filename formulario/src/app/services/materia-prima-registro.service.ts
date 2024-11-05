import { Injectable } from '@angular/core';
import {CommonService} from "./common-service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = environment.baseUrl + environment.MATERIE_PRIME_REGISTRO;


@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaRegistroService extends CommonService {

  constructor(http: HttpClient) {
    super(http, url);
  }

  getStoricoPrezzi(id: any): Observable<any> {
    return this.http.get<any>(this.url + `/${id}`);
  }

}
