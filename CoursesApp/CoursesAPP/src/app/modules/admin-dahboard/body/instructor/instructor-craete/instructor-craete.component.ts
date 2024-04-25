import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor-craete',
  templateUrl: './instructor-craete.component.html',
  styleUrls: ['./instructor-craete.component.css']
})
export class InstructorCraeteComponent implements OnDestroy {
  isimgFileUploaded:boolean=false;
  iscvFileUploaded:boolean=false;
  imagevalidate:boolean=false;
  cvvalidate:boolean=false;
  instructors!:Iinstructor[];
createInstructorsSubscription!:Subscription;

 myform=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
  phone:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required,Validators.email]),
  birthdate:new FormControl('',Validators.required),
  cv:new FormControl('',Validators.required),
  image:new FormControl('',Validators.required),



})

constructor(private instructorservice:InstructorService,private toastr:ToastrService) {


}

  onimgFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['image'].setValue(file);
     
     
     this.isimgFileUploaded=true;
  }

  oncvFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['cv'].setValue(file);
     this.iscvFileUploaded=true;
  }
 
Create(){
  if(!this.myform.valid){
    if(this.myform.controls['image'].value==''||this.myform.controls['cv'].value==''){
      if(this.myform.controls['image'].value==''){
        this.imagevalidate=true;
        this.myform.markAllAsTouched();
      }
     
      if(this.myform.controls['cv'].value==''){
        this.cvvalidate=true;
        this.myform.markAllAsTouched();
       
      }
      this.myform.markAllAsTouched();
      return;
    }
  
    return;
  }else{
    const instructor=new FormData();
     instructor.append("name",this.myform.value.name!)
     instructor.append("phone",this.myform.value.phone!)
     instructor.append("email",this.myform.value.email!)
     instructor.append("birthdate",this.myform.value.birthdate!)
     instructor.append("cv",this.myform.value.cv!)
     instructor.append("img",this.myform.value.image!)
   
    this.createInstructorsSubscription=this.instructorservice.create(instructor).subscribe(result=>{
     if(result.code==200){
      this.toastr.success("Instructor Created Successfully","",{
        progressBar:true,
        progressAnimation:'decreasing'
      });
      this.myform.reset();
      this.imagevalidate=false;
      this.cvvalidate=false;
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
this.createInstructorsSubscription.unsubscribe();
}

}
