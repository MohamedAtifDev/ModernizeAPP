import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { IForgetPassword } from 'src/app/Models/IForgetPassword';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent  {

  constructor(private Auth:AuthServiceService,private toast:ToastrService) {

   }
   validationmessage={
    email:{
      email:'please Enter Valid Email',
      required:'Email is Required'
    }
   }
myForm=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
})

message!:string;
messages:string[]=[];

empty(){
  this.message=''
  this.messages=new Array();
}
forgetPassword(){
  if(this.myForm.valid){
    const fp:IForgetPassword={
      email:this.myForm.value.email||''
    }
    this.Auth.ForgetPassword(fp).subscribe(x=>{
      if(x.code==200){
        localStorage.setItem("token",x.data);
        localStorage.setItem("message",x.message);
        console.log(x);
         this.empty();
        if(x.message=='Something wrong'){
       /* Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
       
        });*/
       this.toast.error("Something went wrong!");

     
      }else{
       /* Swal.fire({
          icon: "success",
          title: "success.",
          text: "Email sent successfully",
       
        });*/
        this.toast.success("Email sent successfully");
    
      }

      }else{
        if(x.code==400){
          console.log(x);
          
          if(x.messages==null){
this.toast.error("Not Found Email");
          }else{
            for(var i=0;i<x.messages?.length;i++){
              this.toast.error(x.messages[i]);
            
          }
          }
        }
      }
    })
  }
}
 

}
