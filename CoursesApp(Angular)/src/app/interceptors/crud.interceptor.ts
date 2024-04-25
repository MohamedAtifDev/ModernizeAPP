import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, delay, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CrudInterceptor implements HttpInterceptor {

  constructor(private toast:ToastrService){

  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("intercepted"+request.body);
    
    return next.handle(request).pipe(
 
      
      catchError((err)=>{
        console.log(err);
        
        if(err!=null){
         
          
          this.toast.error(err?.message,err?.status)
        }
       return throwError(err?.message);
      })
    );
  }
}
