import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor-update',
  templateUrl: './instructor-update.component.html',
  styleUrls: ['./instructor-update.component.css']
})

export class InstructorUpdateComponent implements OnInit,OnDestroy {
  id!:number;
instructordata!:Iinstructor;
instructors!:Iinstructor[];
start!:string;
myform!:FormGroup;

  imagevalidate:boolean=false;
  isimgFileUploaded:boolean=false;
  iscvFileUploaded:boolean=false;
  cvvalidate:boolean=false;
  getInstructorById!: Subscription;

  constructor(private actrouter:ActivatedRoute,private instructorservice:InstructorService,private toastr:ToastrService) {
  
  
    this.actrouter.paramMap.subscribe(res=>{
      this.id=parseInt(res.get("id")||'');
      console.log(this.id);
      
      })
  
      
   
   }

   ngOnInit(): void {

this.getInstructorById=this.instructorservice.GetById(this.id).subscribe(result=>{
  this.instructordata=result.data;
  console.log(this.instructordata);
  
  this.makeform(this.instructordata);
})
  }

  handledate(date:string){
    var year=date.substring(0,4);
    var month=date.substring(5,7);
    var day=date.substring(8,10);
    console.log(year+"-"+month+"-"+day);
    
    return year+"-"+month+"-"+day;
    }
  makeform(data:Iinstructor){
    this.myform=new FormGroup({
      name:new FormControl(data.name,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      phone:new FormControl(data.phone,[Validators.required]),
      email:new FormControl(data.email,[Validators.required,Validators.email]),
      birthdate:new FormControl(this.handledate(data.birthdate.toString().substring(0,10)),Validators.required),
      cv:new FormControl('',Validators.required),
      image:new FormControl('',Validators.required),
    
    
    
    })
  }

  
  
  
  
  
  onimgFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['image'].setValue(file);
     this.isimgFileUploaded=true;
     console.log("changed");
     
  }

  oncvFileChange($event:any){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.myform.controls['cv'].setValue(file);
     this.iscvFileUploaded=true;
  }

  Update(){
    if(!this.myform.valid){
      
      
      if(this.myform.controls['image'].value==''||this.myform.controls['cv'].value==''){
        if(this.myform.controls['image'].value==''){
          this.imagevalidate=true;
          this.myform.markAllAsTouched();
          console.log("not valid");
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
       instructor.append("id",this.id.toString()!);
       instructor.append("name",this.myform.value.name!)
       instructor.append("phone",this.myform.value.phone!)
       instructor.append("email",this.myform.value.email!)
       instructor.append("birthdate",this.myform.value.birthdate!)
       instructor.append("cv",this.myform.value.cv!)
       instructor.append("img",this.myform.value.image!)
     
      this.instructorservice.Update(instructor).subscribe(result=>{
       if(result.code==200){
        this.toastr.success("Instructor Updated Successfully","",{
          progressBar:true,
          progressAnimation:'decreasing'
        });
     
        this.cvvalidate=false;
        this.imagevalidate=false;
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
    this.getInstructorById.unsubscribe();
  }

}