import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
user:any;
roles!:string[];
userDataSubscription!:Subscription;
  constructor(private auth:AuthServiceService) {
  
   }


  ngOnInit(): void {
    this.userDataSubscription=this.auth.getuserData(localStorage.getItem("user")||'0').subscribe(result=>{
      console.log(result.messages);
      
this.user=result.data;
this.roles=result.messages
    })
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    }

}
