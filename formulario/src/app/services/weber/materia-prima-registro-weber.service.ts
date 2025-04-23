import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommonService} from "../common-service";

const url = environment.baseUrl + environment.MATERIE_PRIME_REGISTRO_WEBER;


@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaRegistroWeberService extends CommonService {

  constructor(http: HttpClient) {
    super(http, url);
  }

  getStoricoPrezzi(id: any): Observable<any> {
    return this.http.get<any>(this.url + `/${id}`);
  }

}
