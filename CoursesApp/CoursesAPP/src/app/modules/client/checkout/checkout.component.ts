import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/Models/ICourse';
import { CourseService } from 'src/app/services/course.service';
import { loadStripe,Stripe } from '@stripe/stripe-js';
import { MakeOrderService } from 'src/app/services/make-order.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IOrderConfirmation } from 'src/app/Models/IOrderConfirmation';
import { ToastrService } from 'ngx-toastr';
declare var Stripe:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

course!:ICourse;
id!:number;
checkoutForm!:FormGroup
@ViewChild("cardNumber",{static:true}) cardNumberElement!:ElementRef;
@ViewChild("cardExpiry",{static:true}) cardExpiryElement!:ElementRef;
@ViewChild("cardCVC",{static:true}) CardCVCElement!:ElementRef;
stripe:any;
cardNumber:any;
cardExpiry:any;
cardCVC:any;
cardError:any;
loading=false;
cardhandler=this.onchange.bind(this);
  constructor(private toastr:ToastrService,private router:Router,private courseservices:CourseService,private actrouter:ActivatedRoute,private fb:FormBuilder,private makeorder:MakeOrderService) {
    
this.actrouter.paramMap.subscribe(result=>{
  this.id=parseInt(result.get("id")||'0');
  console.log(result.get("id"));
  this.checkoutForm=fb.group({
    cardHolder:['',[Validators.required,Validators.minLength(10)]],
    Address:['',[Validators.required,Validators.minLength(2)]]
  })
  
})
   }
  async ngOnInit() {
this.courseservices.GetByID(this.id).subscribe(result=>{
  this.course=result.data;
  console.log(this.course);
  
})
 this.stripe=await loadStripe("pk_test_51OKOHJGwORtHjSJQvF4NaR1aoC12qEMcQhHe5gnrKaU28r8ZZi4xsJZs4ZUzh16ugusuQRVLbUQFIhO4bq749sQx00ojp2bIpv");
    var elements=this.stripe.elements();
    console.log(elements);
    
 this.cardNumber=elements.create("cardNumber");
 this.cardNumber.mount(this.cardNumberElement.nativeElement)
 this.cardNumber.addEventListener("change",this.cardhandler)
 this.cardExpiry=elements.create("cardExpiry");
 this.cardExpiry.mount(this.cardExpiryElement.nativeElement)
 this.cardExpiry.addEventListener("change",this.cardhandler)
 this.cardCVC=elements.create("cardCvc");
 this.cardCVC.mount(this.CardCVCElement.nativeElement)
 this.cardCVC.addEventListener("change",this.cardhandler)
  }

  onchange({error}:any){
if(error){
  
this.cardError=error.message
console.log(error);

}else{
  this.cardError=null;
  console.log(error);
}
  }

submit(){
    this.loading=true;
this.makeorder.MakeOrder(this.course.id).subscribe(result=>{
  console.log(this.cardNumber);
  
 this.stripe.confirmCardPayment(result.data,{
    payment_method:{
      card:this.cardNumber,
      billing_details:{
        name:this.checkoutForm.get("cardHolder")?.value,
       
      }
    }
  }).then((res: any)=>{console.log(res)
   
if(res.paymentIntent){

    const data:IOrderConfirmation={
      userID:localStorage.getItem("user")||"",
      courseID:this.course.id,
      paymentID:res.paymentIntent.id,
    
      name:this.checkoutForm.get("cardHolder")?.value
        }
        console.log(data);
        
      
        this.makeorder.confirmOrderDetails(data).subscribe(result=>{
          if(result.code==200){
            this.loading=false;
            this.router.navigate(['/Client/Success'])
            
          }else{
            this.loading=false;
            this.toastr.error(result.message);

          }
           console.log(result.message);
        
        })
      
      

}else{
  this.toastr.error("Something Went Wrong Please,Try Again");
}

}
  ).catch((err:any)=>{this.toastr.error(err)
    this.loading=false;
  }
  );
  
  
})


  }


}


