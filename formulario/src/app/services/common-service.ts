import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export abstract class CommonService {
  protected constructor(protected http: HttpClient, protected url:string ) { }

 update(data: any): Observable<any> {
   return this.http.put(`${this.url}`, data);
  }

}
