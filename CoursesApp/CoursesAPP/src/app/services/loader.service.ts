import { Injectable } from '@angular/core';
import { NgxSpinner,NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
timer=0;
  constructor(private spinner:NgxSpinnerService) { 


  }
  loader(){
    this.timer++;
 
this.spinner.show(undefined,
  {
    type:"square-jelly-box",
    color:"rgba(255,255,255)",
    bdColor:"rgba(0,0,0,0.8)",
    size:"medium",
    fullScreen:true
  })
  }

  hide(){
    this.timer--;
    if(this.timer<=0){
      this.timer=0;
      this.spinner.hide();
    }
    
  }
}
