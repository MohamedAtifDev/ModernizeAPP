import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBranch } from 'src/app/Models/IBranch';
import { ICourse } from 'src/app/Models/ICourse';
import { ICourseBranch } from 'src/app/Models/ICourseBranch';
import { BranchService } from 'src/app/services/branch.service';
import { CourseBranchesService } from 'src/app/services/course-branches.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-branch-course-delete',
  templateUrl: './branch-course-delete.component.html',
  styleUrls: ['./branch-course-delete.component.css']
})
export class BranchCourseDeleteComponent implements OnInit {
  disabledattr=true;
  myform=new FormGroup({
    course:new FormControl(0,[Validators.required]),

  })
  courses!:ICourse[];
  branches:IBranch[]=[];
 start=false;
 show=false;
  constructor(private course:CourseService,private toast:ToastrService,private courseBranch:CourseBranchesService,private branch:BranchService ) { 
    course.getAll().subscribe(result=>{
      this.courses=result.data;
    })
  }

  ngOnInit(): void {
  }
  loadBranches(){
   this.show=true;
    this.branches.splice(0,this.branches.length);
this.courseBranch.GetById(this.myform.controls["course"].value||0).subscribe(result=>{
for (let index = 0; index < result.data.length; index++) {
  if(result.data[index].branch!==null){
    this.branches.push(result.data[index].branch as IBranch)
   
  }
  console.log(this.branches.length);
  
  
}
console.log(this.branches);
if(this.branches.length==0){
  this.start=true;
}else{
  this.start=false;
}
})



}
Delete(id:number){
  console.log(id,this.myform.controls["course"].value);
const data:ICourseBranch={
  courseid:parseInt(this.myform.controls["course"].value?.toString()||"0"),
  branchid:id
}
  this.courseBranch.Delete(data).subscribe(result=>{
    if(result.code==200){
      this.toast.success(result.message,"",{
        progressBar:true,
        progressAnimation:'decreasing'
      });
 this.loadBranches();

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
