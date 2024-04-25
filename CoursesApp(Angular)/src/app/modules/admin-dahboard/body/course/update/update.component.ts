import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ICourse } from 'src/app/Models/ICourse';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
id!:number;
coursedata!:ICourse;
instructors!:Iinstructor[];
start!:string;
myform!:FormGroup;
isFileUploaded:boolean=false;
  imagevalidate:boolean=false;
  constructor(private Course:CourseService,private actrouter:ActivatedRoute,private instructorservice:InstructorService,private toastr:ToastrService) {
  
  
    this.actrouter.paramMap.subscribe(res=>{
      this.id=parseInt(res.get("id")||'');
      console.log(this.id);
      
      })
    this.instructorservice.GetAll().pipe(filter(x=>(x.course?.id)==this.id||x.course==null)).subscribe(x=>{
    
      if(x.code==200){
    this.instructors=x.data.filter(x=>(x.course?.id)==this.id||x.course==null);
        this.Course.GetByID(this.id).subscribe(result=>{
          console.log(result.data);

          this.coursedata=result.data;
          this.makeform(this.coursedata)
          
        
       })
  }
      
  
  
  })
      
   
   }

   ngOnInit(): void {


  }
  makeform(data:ICourse){
    this.myform=new FormGroup({
      name:new FormControl(data?.name,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      description:new FormControl(data?.description,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      price:new FormControl(data?.price,[Validators.required,Validators.min(10),Validators.max(10000)]),
      startdate:new FormControl(this.handledate(data?.startDate.substring(0,10)),[Validators.required]),
      enddate:new FormControl(this.handledate(data?.endDate.substring(0,10)),[Validators.required]),
      image:new FormControl('',[Validators.required]),
      instructorid:new FormControl(data?.instructorid,Validators.required)
  })

  
  
  
  }
  
  onFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['image'].setValue(file);
     this.isFileUploaded=true;
  }


handledate(date:string){
var year=date.substring(0,4);
var month=date.substring(5,7);
var day=date.substring(8,10);
console.log(year+"-"+month+"-"+day);

return year+"-"+month+"-"+day;
}
  Update(){
    if(!this.myform.valid){
      if(this.myform.controls['image'].value==''){
        this.myform.markAllAsTouched();
        this.imagevalidate=true;
        console.log(this.myform.value.enddate);
        return;
      }
      this.myform.markAllAsTouched();
      
      return;
    }else{
    
      const crs=new FormData();
      console.log(this.id);
      console.log(this.myform.value);
      
      crs.append("id",this.coursedata.id.toString()!)
       crs.append("name",this.myform.value.name!)
       crs.append("description",this.myform.value.description!)
       crs.append("price",this.myform.value.price!)
       crs.append("startdate",this.myform.value.startdate!)
       crs.append("enddate",this.myform.value.enddate!)
       crs.append("img",this.myform.value.image!)
       crs.append("instructorid",this.myform.value.instructorid!)
    
      console.log(this.myform.value.image);
      
    this.Course.Update(crs).subscribe(x=>{
   if(x.code==200){
    this.toastr.success("Course Updated Successfully","",{
      progressBar:true,
      progressAnimation:'decreasing'
    });
    
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
}
