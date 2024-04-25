import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HomeComponent } from './modules/admin-dahboard/body/home/home.component';
import { BodyComponent } from './modules/admin-dahboard/body/body.component';
import { AdminDahboardRoutingModule } from './modules/admin-dahboard/admin-dahboard-routing.module';
const routes: Routes = [{path:'Admin',loadChildren:()=> 
  import('./modules/admin-dahboard/admin-dahboard.module').then(m=>m.AdminDahboardModule),},{path:"Client",loadChildren:()=>import("./modules/client/client.module").then(m=>m.ClientModule)},
{path:"Auth",loadChildren:()=>import("./modules/auth/auth.module").then(m=>m.AuthModule)},
{path:'',redirectTo:"Auth",pathMatch:'full'},{path:"**",component:NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
