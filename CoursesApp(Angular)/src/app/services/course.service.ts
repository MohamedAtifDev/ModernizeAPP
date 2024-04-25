import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../Models/IResponse';
import { Observable, observable } from 'rxjs';
import { ICourse } from '../Models/ICourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { 

  }
  headers= new HttpHeaders()
  .set('content-type', 'application/json');
 

  getAll():Observable<IResponse<ICourse[]>>{
    return this.http.get<IResponse<ICourse[]>>(`${environment.APIHost}/Course/GetAll`,{headers:this.headers})

  }
  Delete(id:number):Observable<IResponse<string>>{
    return this.http.delete<IResponse<string>>(`${environment.APIHost}/Course/Delete/${id}`,{headers:this.headers})
  }
  GetByID(id:number):Observable<IResponse<ICourse>>{
    return this.http.get<IResponse<ICourse>>(`${environment.APIHost}/Course/Details/${id}`,{headers:this.headers})

  }
  Create(course:FormData):Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${environment.APIHost}/Course/Create`,course,undefined)
  }
  Update(course:FormData):Observable<IResponse<string>>{
    return this.http.put<IResponse<string>>(`${environment.APIHost}/Course/Update`,course,undefined)
  }
}
