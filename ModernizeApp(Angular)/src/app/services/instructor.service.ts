import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iinstructor } from '../Models/Iinstructor';
import { IResponse } from '../Models/IResponse';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
/**
 *
 */
constructor(private http:HttpClient) {


}
   jsonheader=new HttpHeaders().set('content-type', 'application/json')

  GetAll():Observable<IResponse<Iinstructor[]>>{
    return this.http.get<IResponse<Iinstructor[]>>(`${environment.APIHost}/Instructor/GetAll`,{headers:this.jsonheader});
  }
  Delete(id:number):Observable<IResponse<string>> {
    return this.http.delete<IResponse<string>>(`${environment.APIHost}/Instructor/Delete/${id}`,{headers:this.jsonheader});
  }
  GetById(id:number):Observable<IResponse<Iinstructor>> {
    return this.http.get<IResponse<Iinstructor>>(`${environment.APIHost}/Instructor/GetById/${id}`,{headers:this.jsonheader});
  }
  create(instructor:FormData):Observable<IResponse<string>>{
return this.http.post<IResponse<string>>(`${environment.APIHost}/Instructor/Create`,instructor,undefined);
  }
  Update(instructor:FormData):Observable<IResponse<string>>{
    return this.http.put<IResponse<string>>(`${environment.APIHost}/Instructor/Update`,instructor,undefined);
      }
}
