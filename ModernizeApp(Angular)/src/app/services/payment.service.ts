import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../Models/IResponse';
import { IPayment } from '../Models/IPayment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  getAll():Observable<IResponse<IPayment[]>>{
    return this.http.get<IResponse<IPayment[]>>(`${environment.APIHost}/Payment/GetAll`)
  }
  getById(id:string):Observable<IResponse<IPayment>>{
    return this.http.get<IResponse<IPayment>>(`${environment.APIHost}/Payment/GetById/${id}`)

  }
}
