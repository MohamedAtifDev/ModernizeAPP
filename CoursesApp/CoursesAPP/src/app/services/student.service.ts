import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../Models/IResponse';
import { environment } from 'src/environments/environment';
import { IStudent } from '../Models/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  getAll():Observable<IResponse<IStudent[]>>{
    return this.http.get<IResponse<IStudent[]>>(`${environment.APIHost}/Student/GetAll`);
  }
  GetById(id:string):Observable<IResponse<IStudent>>{
    return this.http.get<IResponse<IStudent>>(`${environment.APIHost}/Student/GetById/${id}`);

  }
}
