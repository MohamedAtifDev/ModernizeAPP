import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IForgetPassword } from 'src/app/Models/IForgetPassword';
import { ISignup } from 'src/app/Models/ISignup';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  constructor(private Auth:AuthServiceService,private router:Router,private Toastr:ToastrService) {
    
   }
   messages:string[]=[]
   message!:string
   regex!: RegExp;
   messageValidate = {
    phone: {
      required: 'phone is required',
    
    },
    email: {
      required: 'email is required',
      notValid: 'invalid Email',
      matchEmail: ''
    },
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
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  confirmpassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
  phone:new FormControl('',[Validators.required])
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
  isEmailExist(){
    const fp:IForgetPassword={email:this.myform.value.email||''};
    console.log(fp);
    
    this.Auth.isEmailExist(fp).subscribe(x=>{
      if(x.code==400){
        this.messageValidate.email.matchEmail=x.message;
       console.log(x.message);
      
      }else{
        console.log(x.message);
        this.messageValidate.email.matchEmail='';
        
      }
    })
  }
Signup(){
if(this.myform.valid&&this.isPasswordMatch()&& this.messageValidate.email.matchEmail==''&&this.messageValidate.pass.notMatch.length==0){
  const sign:ISignup={
    email:this.myform.value.email||'',
    password:this.myform.value.password||'',
    confirmpassord:this.myform.value.confirmpassword||'',
phone:this.myform.value.phone||''
  }
  this.Auth.signup(sign).subscribe(x=>{
    if(x.code==200){
this.router.navigate(['/Auth/Login'])
this.message='';
this.messages=new Array();
    }else{
      if(x.messages==null){
this.Toastr.error(x.message)
      }else{
        for(var i=0;i<x.messages?.length;i++){
          this.Toastr.error(x.messages[i]);
        
      }
    }
  
    }
  })
  
}else{
  console.log("Not Done");
  
}
}
 
}
