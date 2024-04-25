import { NonNullAssert } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/Models/IBranch';
import { ICourse } from 'src/app/Models/ICourse';
import { ICourseBranch } from 'src/app/Models/ICourseBranch';
import { BranchService } from 'src/app/services/branch.service';
import { CourseBranchesService } from 'src/app/services/course-branches.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-branch-course-create',
  templateUrl: './branch-course-create.component.html',
  styleUrls: ['./branch-course-create.component.css']
})
export class BranchCourseCreateComponent implements OnInit,OnDestroy {
  disabledattr=true;
  getAllCoursesSubscription!:Subscription;
  getAllBranchesSubscription!:Subscription;
  myform=new FormGroup({
    course:new FormControl(0,[Validators.required]),
    branch:new FormControl({value:0,disabled:this.disabledattr},[Validators.required])
  })
  courses!:ICourse[];
  branches!:IBranch[];
 
  constructor(private course:CourseService,private toast:ToastrService,private courseBranch:CourseBranchesService,private branch:BranchService ) { 
  
  }
  
  ngOnInit(): void {
    this.getAllCoursesSubscription=this.course.getAll().subscribe(result=>{
      this.courses=result.data;
    })
  }
  loadBranches(){
    this.myform.controls['branch'].enable()
    this.getAllBranchesSubscription=this.branch.GetAll().subscribe(result=>{
     this.branches=result.data;
})

  }
Assign(){

  if(!this.myform.valid){
    this.myform.markAllAsTouched();
    return;
  }else{
    
    const data:ICourseBranch={
      branchid:this.myform.controls["branch"].value||0,
      courseid:this.myform.controls["course"].value||0,



    }
    console.log(data);
    
    this.courseBranch.Add(data).subscribe(result=>{
      if(result.code==200){
        this.toast.success(result.message,"",{
          progressBar:true,
          progressAnimation:'decreasing'
        });
        this.myform.reset();
this.myform.controls['branch'].disable();

       }else{
        if(result.messages==null){
          this.toast.error(result.message,"",{
            progressBar:true,
            progressAnimation:'decreasing'
          });
        }else{
          for (let index = 0; index < result.messages.length; index++) {
            this.toast.error(result.messages[index],"",{
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
this.getAllBranchesSubscription.unsubscribe();
this.getAllCoursesSubscription.unsubscribe();
}

}
