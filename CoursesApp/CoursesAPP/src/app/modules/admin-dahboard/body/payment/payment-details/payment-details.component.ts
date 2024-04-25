import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPayment } from 'src/app/Models/IPayment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit ,OnDestroy{
id!:string;
payment!:IPayment
getPaymnetSubscription!:Subscription;
  constructor(private paymentservice:PaymentService,private actrouter:ActivatedRoute) { 
    actrouter.paramMap.subscribe(result=>{
      this.id=result.get("id")||''
    })
  }

  ngOnInit(): void {
    this.getPaymnetSubscription=this.paymentservice.getById(this.id).subscribe(result=>{
this.payment=result.data;
    })


  }
  ngOnDestroy(): void {
    this.getPaymnetSubscription.unsubscribe()
   }
 


}
