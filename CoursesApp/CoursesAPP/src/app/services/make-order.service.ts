import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../Models/IResponse';
import { IOrderConfirmation } from '../Models/IOrderConfirmation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MakeOrderService {
 private headers!:any;
  constructor(private http:HttpClient) {
this.headers=new HttpHeaders({
  "content-type":"application/json"
})
   }

   MakeOrder(crsID:number):Observable<IResponse<string>>{
    return this.http.get<IResponse<string>>(`${environment.APIHost}/MakeOrder/${crsID}`);
   }
   confirmOrderDetails(orderconfirm:IOrderConfirmation):Observable<IResponse<string>>{
return this.http.post<IResponse<string>>(`${environment.APIHost}/ConfirmOrder`,JSON.stringify(orderconfirm),{headers:this.headers})
   }
}
