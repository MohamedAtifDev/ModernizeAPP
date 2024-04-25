import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import{ToastrModule}from'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes:Routes=[{path:"",redirectTo:"Login",pathMatch:"full"},{path:'ResetPassword',component:ResetPasswordComponent},{path:"signup",component:SignupComponent},{path:"Login",component:LoginComponent},{path:"ForgetPassword",component:ForgetPasswordComponent}]


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),


  ],
  exports:[
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent
  ]
})
export class AuthModule { }
