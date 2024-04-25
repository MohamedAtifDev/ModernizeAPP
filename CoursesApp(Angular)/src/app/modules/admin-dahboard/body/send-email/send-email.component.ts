import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ISendEmail } from 'src/app/Models/ISendEmail';
import { SendEmailService } from 'src/app/services/send-email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements  OnDestroy{
myform!:FormGroup;
sendEmailSubscription!:Subscription;
  constructor(private sendemail:SendEmailService,private toast:ToastrService) {

    this.myform=new FormGroup({
      Email:new FormControl('',[Validators.required,Validators.email]),
      Message:new FormControl('',[Validators.required,Validators.minLength(10)])
    })
   }


  send(){
    const send:ISendEmail={
      email:this.myform.get("Email")?.value,
      message:this.myform.get("Message")?.value
    }
    this.sendEmailSubscription=this.sendemail.send(send).subscribe(result=>{
      if(result.data){
this.toast.success("Email Sent Successfully");
      }else{
        this.toast.error("Email Not sent Please Try Again");
      }
    })
    console.log(send);
    
  }
  ngOnDestroy(): void {
    this.sendEmailSubscription.unsubscribe()
   }
 
}
