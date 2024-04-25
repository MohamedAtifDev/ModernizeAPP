import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientIndexComponent } from './ClientIndex/client-index/client-index.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [{path:"Index",component:ClientIndexComponent},{path:'',redirectTo:'Index',pathMatch:'full'},{path:"Success",component:SuccessComponent},{path:"Checkout/:id",component:CheckoutComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
