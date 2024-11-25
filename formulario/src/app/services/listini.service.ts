import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommonListComponent} from "../components/commonListComponent";
import {CommonService} from "./common-service";
import {environment} from "../../environments/environment";

const url = environment.baseUrl + environment.LISTINI;

@Injectable({
  providedIn: 'root'
})
export class ListiniService extends CommonService{

  constructor(http: HttpClient) {
    super(http, url);
  }

  getAllByIdProdotto(id: number) : Observable<any> {
    return this.http.get<any>(this.url + `/${id}`);
  }

  getAll() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getListiniByIdValoreListino(id: any) : Observable<any> {
    return this.http.get<any>(this.url + `/dettaglio/${id}`);
  }

  generaListino(id:any, iva:any): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(`${this.url}/genera-listino/${id}/${iva}`, httpOptions);
  }
}
