import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
   timer=0;
  constructor(private loader:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(!request.url.includes("GetAll")){
      this.loader.loader();
      this.timer=1000;
      console.log("start");
      
    }
    if(request.url.includes("MakeOrder")){
      this.loader.loader();
      this.timer=1000;
      console.log("include");
      
    }
    
    return next.handle(request).pipe(
      
      delay(this.timer),
      finalize(()=>{
        this.loader.hide();
      }
    ))
  }
}
