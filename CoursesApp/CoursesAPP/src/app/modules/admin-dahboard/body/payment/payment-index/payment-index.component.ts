import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { IPayment } from 'src/app/Models/IPayment';
import { BtncallrenderComponent } from '../../btncallrender/btncallrender.component';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.css']
})
export class PaymentIndexComponent implements OnInit,OnDestroy {
  rows:IPayment[]=[];
defaultcoldif={sortable:true,filter:true}
  cols:ColDef[]=[
    {field:"id",maxWidth:200},
    {field:"name"},
    {field:"date"},
  
    {
      field: 'Details',headerClass: 'Details',maxWidth:150,
      cellRenderer: BtncallrenderComponent,
      cellRendererParams: {
        clicked: (field: any) => {
        this.DetailsClicked(field);
        
        
   }
   
   }
    }
  ]
  getPaymnetSubscription!:Subscription;
  constructor(private router:Router,private payment:PaymentService) { }

  ngOnInit(): void {
   
    this.getPaymnetSubscription=this.payment.getAll().subscribe(result=>{
  console.log(result.data);
  result.data.forEach((Ele)=>{
    var date=new Date(Ele.date)
     Ele.date=date;
  
   
  })
  this.rows=result.data;
 
 
})
  }
  ngOnDestroy(): void {
    this.getPaymnetSubscription.unsubscribe()
      }
    
  DetailsClicked(field:any){
    this.router.navigate(['/Admin/Payment/Details/'+field+''])
    }
}
