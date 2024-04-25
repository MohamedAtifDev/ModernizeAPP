import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { ILogin } from '../Models/ILogin';
import { IResponse } from '../Models/IResponse';
import { ISignup } from '../Models/ISignup';
import { IForgetPassword } from '../Models/IForgetPassword';
import{ IResetPassword } from'../Models/IResetPassword'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) {
  
   }
   headers= new HttpHeaders()
   .set('content-type', 'application/json')
  
   Login(login:ILogin):Observable<IResponse<String>>{
    console.log(JSON.stringify(login));
    
    return this.http.post<IResponse<String>>(`${environment.APIHost}/Login`,JSON.stringify(login),{headers:this.headers});
    
   }
   signup(signup:ISignup):Observable<IResponse<String>>{
return this.http.post<IResponse<String>>(`${environment.APIHost}/signup`,JSON.stringify(signup),{headers:this.headers});
   }
   isEmailExist(fg:IForgetPassword):Observable<IResponse<String>>{
return this.http.post<IResponse<String>>(`${environment.APIHost}/isEmailExist`,JSON.stringify(fg),{headers:this.headers})
   }
   ForgetPassword(fp:IForgetPassword):Observable<IResponse<string>>{
      return this.http.post<IResponse<string>>(`${environment.APIHost}/ForgetPassword`,JSON.stringify(fp),{headers:this.headers})
   }
   resetPassword(rs:IResetPassword):Observable<IResponse<string>>{
return this.http.post<IResponse<string>>(`${environment.APIHost}/ResetPassword`,JSON.stringify(rs),{headers:this.headers});
   }

   getuserData(id:string):Observable<IResponse<any>>{
      return this.http.get<IResponse<any>>(`${environment.APIHost}/GetCurrentUser/${id}`,{headers:this.headers})
   }

   signout():Observable<IResponse<string>>{
      return this.http.post<IResponse<string>>(`${environment.APIHost}/signout  `,{headers:this.headers});
   }

   getAdmins():Observable<IResponse<any>>{
      return this.http.get<IResponse<any>>(`${environment.APIHost}/GetAdmins/`)

   }
}
