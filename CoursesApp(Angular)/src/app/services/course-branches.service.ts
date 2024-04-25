import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { ICourseBranch } from '../Models/ICourseBranch';
import { IResponse } from '../Models/IResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseBranchesService {

  constructor(private http:HttpClient) { }
  headers= new HttpHeaders()
  .set('content-type', 'application/json');


Add(crsbranch:ICourseBranch):Observable<IResponse<string>>{
  return this.http.post<IResponse<string>>(`${environment.APIHost}/CourseBranches/Create`,JSON.stringify(crsbranch),{headers:this.headers});
}

GetById(courseid:number):Observable<IResponse<ICourseBranch[]>>{
  return this.http.get<IResponse<ICourseBranch[]>>(`${environment.APIHost}/CourseBranches/GetById/${courseid}`,{headers:this.headers})
}

Delete(CourseBranch:ICourseBranch):Observable<IResponse<string>>{
  return this.http.post<IResponse<string>>(`${environment.APIHost}/CourseBranches/Delete`,JSON.stringify(CourseBranch),{headers:this.headers})
}
}