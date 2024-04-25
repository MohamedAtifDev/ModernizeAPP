import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICourse } from 'src/app/Models/ICourse';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnDestroy {
  isFileUploaded:boolean=false;
  imagevalidate:boolean=false;
 instructors!:Iinstructor[];
 

 myform=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
  description:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
  price:new FormControl('',[Validators.required,Validators.min(10),Validators.max(10000)]),
  startdate:new FormControl('',Validators.required),
  enddate:new FormControl('',Validators.required),
  image:new FormControl('',Validators.required),
  instructorid:new FormControl('',Validators.required)



})
  getAllInstructors!: Subscription;
  createCourseSubscription!: Subscription;

constructor(private instructorservice:InstructorService,private courseservices:CourseService,private toastr:ToastrService) {


}
 
  ngOnInit(): void {
    this.getAllInstructors=this.instructorservice.GetAll().subscribe(x=>{
      this.instructors=x.data.filter(x=>x.course==null);
      console.log(this.instructors);
      
     })
  }

  onFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['image'].setValue(file);
     this.isFileUploaded=true;
  }
  handledate(date:string){
    var dd=Date.parse(date);
    return new Date(dd);
   
  }
Create(){
  if(!this.myform.valid){
    if(this.myform.controls['image'].value==''){
      this.imagevalidate=true;
      this.myform.markAllAsTouched();
      return;
    }
    this.myform.markAllAsTouched();
    return;
  }else{
  
    const crs=new FormData();
     crs.append("name",this.myform.value.name!)
     crs.append("description",this.myform.value.description!)
     crs.append("price",this.myform.value.price!)
     crs.append("startdate",this.myform.value.startdate!)
     crs.append("enddate",this.myform.value.enddate!)
     crs.append("img",this.myform.value.image!)
     crs.append("instructorid",this.myform.value.instructorid!)
  
    
  this.createCourseSubscription=this.courseservices.Create(crs).subscribe(x=>{
 if(x.code==200){
  this.toastr.success("Course Created Successfully","",{
    progressBar:true,
    progressAnimation:'decreasing'
  });
  this.myform.reset();
  this.isFileUploaded=false;
  this.instructorservice.GetAll().subscribe(x=>{
    this.instructors=x.data.filter(x=>x.course==null);
   }).unsubscribe();
 }else{
  if(x.messages==null){
    this.toastr.error(x.message,"",{
      progressBar:true,
      progressAnimation:'decreasing'
    });
  }else{
    for (let index = 0; index < x.messages.length; index++) {
      this.toastr.error(x.messages[index],"",{
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
  this.getAllInstructors.unsubscribe(); 
  this.createCourseSubscription.unsubscribe();
}
}

