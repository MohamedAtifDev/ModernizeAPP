import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { CrudInterceptor } from './interceptors/crud.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ScrollSpyDirective } from './Directives/scroll-spy.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ScrollSpyDirective,
   

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
ToastrModule.forRoot(),
BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:CrudInterceptor,multi:true},{provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
