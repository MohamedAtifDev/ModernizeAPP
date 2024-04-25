import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientIndexComponent } from './ClientIndex/client-index/client-index.component';
import { WINDOW, WINDOW_PROVIDERS } from 'src/app/services/window.service';
import { CountUpModule } from 'ngx-countup';
import { NgwWowModule } from 'ngx-wow';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { NgxSplideModule } from 'ngx-splide';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SuccessComponent } from './success/success.component';


register();

@NgModule({
  declarations: [
    ClientIndexComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CountUpModule,
    CarouselModule,
    NgxSplideModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  
    
  

  ],
  providers:[WINDOW_PROVIDERS]
 
})
export class ClientModule { }
