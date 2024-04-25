import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from '../Models/IBranch';
import { IResponse } from '../Models/IResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }
  headers= new HttpHeaders()
  .set('content-type', 'application/json');

  GetAll():Observable<IResponse<IBranch[]>>{
    return this.http.get<IResponse<IBranch[]>>(`${environment.APIHost}/Branch/GetAll`,{headers:this.headers})

  }
  GetByID(id:number):Observable<IResponse<IBranch>>{
    return this.http.get<IResponse<IBranch>>(`${environment.APIHost}/Branch/GetById/${id}`,{headers:this.headers})

  }

  Create(Branch:IBranch):Observable<IResponse<IBranch>>{
    console.log(JSON.stringify(Branch));
    
    return this.http.post<IResponse<IBranch>>(`${environment.APIHost}/Branch/Create`,JSON.stringify(Branch),{headers:this.headers})
  }

  Update(Branch:IBranch):Observable<IResponse<IBranch>>{
    console.log(JSON.stringify(Branch));
    
    return this.http.put<IResponse<IBranch>>(`${environment.APIHost}/Branch/Update`,JSON.stringify(Branch),{headers:this.headers})
  }

  Delete(id:number):Observable<IResponse<IBranch[]>>{
    return this.http.delete<IResponse<IBranch[]>>(`${environment.APIHost}/Branch/Delete/${id}`,{headers:this.headers})

  }

}
