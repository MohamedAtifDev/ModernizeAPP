import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instrustor-details',
  templateUrl: './instrustor-details.component.html',
  styleUrls: ['./instrustor-details.component.css']
})
export class InstrustorDetailsComponent implements OnInit ,OnDestroy{
id!:number;
instructordata!:Iinstructor;
  getInstructorSubscription!: Subscription;
  constructor(private actrouter:ActivatedRoute,private Course:CourseService,private instructor:InstructorService) { 
    this.actrouter.paramMap.subscribe(res=>{
    this.id=parseInt(res.get("id")||'');
    console.log(this.id);
    
    
    })
      }
 
    
      ngOnInit(): void {
    
     
       this.getInstructorSubscription= this.instructor.GetById(this.id).subscribe(res=>{
          if(res.code==200){
            this.instructordata=res.data;
            console.log(this.instructordata);
            
          }
        })
      
   
      }
      ngOnDestroy(): void {
    this.getInstructorSubscription.unsubscribe();
      }
    }
    
