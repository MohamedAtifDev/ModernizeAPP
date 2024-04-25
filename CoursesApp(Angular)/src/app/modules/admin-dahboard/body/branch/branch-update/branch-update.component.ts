import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/Models/IBranch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.css']
})
export class BranchUpdateComponent implements OnInit,OnDestroy {

  id!:number;
  name!:string;
  getBranchSubscription!:Subscription;
  myform=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    location:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)])
  })
    constructor(private branch:BranchService,private toastr:ToastrService,private router:Router,private actrouter:ActivatedRoute) {

      this.actrouter.paramMap.subscribe(res=>{
        this.id=parseInt(res.get("id")||'');
        console.log(this.id);
        
        })
    
        
     }
 
    ngOnInit(): void {
      this.getBranchSubscription=this.branch.GetByID(this.id).subscribe(result=>{
      if(result.code==200){
    this.myform.setValue({"name":result.data.name?? '',"location":result.data.location?? ''})
   
      }
     })
   
    }
   
  Update(){
  if(!this.myform.valid){
  this.myform.markAllAsTouched();
  return;
  }else{
    console.log(this.myform.value.name);
    
    const branch:IBranch={
      id:this.id,
  name:this.myform.value.name||'',
  location:this.myform.value.location||'',
  CourseBranches:[]
    }
    console.log(branch);
    
    this.branch.Update(branch).subscribe(result=>{
      if(result.code==200){
        this.toastr.success("Branch Updated Successfully","",{
          progressBar:true,
          progressAnimation:'decreasing'
        });
      
     
       }else{
        if(result.messages==null){
          this.toastr.error(result.message,"",{
            progressBar:true,
            progressAnimation:'decreasing'
          });
        }else{
          for (let index = 0; index < result.messages.length; index++) {
            this.toastr.error(result.messages[index],"",{
              progressBar:true,
              progressAnimation:'decreasing'
            
            });
            
          }
        }
       }
      })
  }
  
  }
  ngOnDestroy(): void {
    this.getBranchSubscription.unsubscribe();
  }
  
  }
  