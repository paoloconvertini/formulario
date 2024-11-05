import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common-service";
import {MateriaPrimaDto} from "../models/materia-prima-dto";

const url = environment.baseUrl + environment.MATERIE_PRIME;

@Injectable({
  providedIn: 'root'
})
export class MateriePrimeService extends CommonService{

  constructor(http: HttpClient) {
    super(http, url);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  save(dto: MateriaPrimaDto): Observable<any>  {
    return this.http.post<any>(this.url, dto);
  }

  aggiorna(dto: MateriaPrimaDto, id: number): Observable<any>  {
    return this.http.put<any>(this.url + `/${id}`, dto);
  }

  elimina(data: any): Observable<any>  {
    return this.http.delete<any>('/elimina', data);
  }

}
