import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/Models/IBranch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit ,OnDestroy{
  id!:number;
  branchdata!:IBranch;
  getBranchSubscription!:Subscription;
    constructor(private actrouter:ActivatedRoute,private branch:BranchService) { 
      this.actrouter.paramMap.subscribe(res=>{
      this.id=parseInt(res.get("id")||'');
      console.log(this.id);
      
      
      })
        }
      
        ngOnInit(): void {
      this.getBranchSubscription= this.branch.GetByID(this.id).subscribe(x=>{
        if(x.code==200){
          this.branchdata=x.data;     
        }
 
       })
        }
        ngOnDestroy(): void {
          this.getBranchSubscription.unsubscribe();
        }
    
      }
      
  