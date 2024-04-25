import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IResetPassword } from 'src/app/Models/IResetPassword';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  {

  constructor(private Auth:AuthServiceService,private router:Router,private Toastr:ToastrService,private actrouter:ActivatedRoute) {
    
  }
  messages:string[]=[]
  message!:string
  regex!: RegExp;
  messageValidate = {
 
   pass: {
     required: 'password is required',
     minLength: 'min length is 6 characters',
     notMatch:new Array(),
   },
   passConfirm: {
     required: 'Confirm password is Required',
     minLength: 'min length is 6 characters',
isMatch:" must Match password "   
}
 };

  isPasswordValid() {
   const pass = this.myform.value.password ||'';
   console.log(pass);
   
   if (pass !== '' && pass.length > 5) {
     this.regex = new RegExp('[a-z]');
     if (!this.regex.test(pass)) {
       this.messageValidate.pass.notMatch.push("must contain at least 1 small letter");
  
     }
     this.regex = new RegExp('[A-Z]');
     if (!this.regex.test(pass)) {
       this.messageValidate.pass.notMatch.push('must contain at least 1 cap letter');

     }
     this.regex = new RegExp('[~!@#$%^&*()+<>{}]');
     if (!this.regex.test(pass)) {
       this.messageValidate.pass.notMatch.push('must contain at least 1 special character');
 
     }
     this.regex = new RegExp('[0-9]');
     if (!this.regex.test(pass)) {
       this.messageValidate.pass.notMatch.push('must contain at least 1 number');
 
     }

     
   }

 }

empty(){
 this.messageValidate.pass.notMatch=new Array();
}
myform=new FormGroup({

 password:new FormControl('',[Validators.required,Validators.minLength(6)]),
 confirmpassword:new FormControl('',[Validators.required,Validators.minLength(6)]),

})
  isPasswordMatch() {
   if (this.messageValidate.pass.notMatch.length==0 && this.myform.value.confirmpassword==this.myform.value.password) {
     if (this.myform.value.password?.length||''.length > 5 && this.myform.value.confirmpassword?.length||''.length > 5) {
       return true;
     }else{
       return false;
     }
   }else{
     return false;
   }
  
 }
resetPassword(){
this.actrouter.queryParamMap.subscribe(x=>{
  var token=x.get("token");
 var email=x.get("email");
 if(token==localStorage.getItem("token")){
  console.log(token);
 
 }
 if(token==localStorage.getItem("token")){
 const resetPassword:IResetPassword={
 
  token:token||'',
  email:email||'',
  password:this.myform.value.password||'',
  confirmpassword:this.myform.value.confirmpassword||''

 }
 this.Auth.resetPassword(resetPassword).subscribe(x=>{
 if(x.code==200){this.router.navigate(["/Auth/Login"])}
 else{
  if(x.messages==null){
    this.Toastr.error(x.message)
          }else{
            for(var i=0;i<x.messages?.length;i++){
              this.Toastr.error(x.messages[i]);
            
          }
 }
}
 })
  
}
})
}

}
