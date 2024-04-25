import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ILogin } from 'src/app/Models/ILogin';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  checked=false;;
  Message:string="";
  Messages:string[]=[]
  constructor(private Auth:AuthServiceService,private toast:ToastrService,private router:Router) {

   }
   changecheck(){
    this.checked=!this.checked;
   }
   messageValidate = {
    email: {
      required: 'Email is Required',
      Email:'Please Enter valid Email'
    },
    pass: {
required:'Password is required'    },
  };
 myForm=new FormGroup({
  Email:new FormControl('',[Validators.required,Validators.email]),
  Password:new FormControl('',[Validators.required]),


 })
Login(){
  if(this.myForm.valid){
    console.log("valid");
    
    const log:ILogin={
      Email:this.myForm.value.Email||'',
      password:this.myForm.value.Password||'',
      rememberme:this.checked

    }
    this.Auth.Login(log).subscribe(x=>{
      if(x.code==200){
     localStorage.setItem("user",x.data.toString())
       this.Message="";
       this.Messages=new Array();
       this.Auth.getAdmins().subscribe(result=>{
        if(result.data.find((x:any)=>x.id==localStorage.getItem("user"))){
          this.router.navigate(['/Admin'])
        }else{
          this.router.navigate(['/Client'])
        }
       })
      }else{
        if(x.messages==null){
       this.toast.error(x.message);
        }else{
          
          for(var i=0;i<x.messages?.length;i++){
            this.toast.error(x.messages[i]);
          }
        }
   
      }
    })
  }
}
}
