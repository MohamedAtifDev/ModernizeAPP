import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendEmail } from '../Models/ISendEmail';
import { Observable } from 'rxjs';
import { IResponse } from '../Models/IResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
private headers=new HttpHeaders({
"Content-type":"application/json"
})
  constructor(private http:HttpClient) { }
  send(SendEmail:ISendEmail):Observable<IResponse<boolean>>{
    return this.http.post<IResponse<boolean>>(`${environment.APIHost}/SendEmail`,JSON.stringify(SendEmail),{headers:this.headers})

  }
}
