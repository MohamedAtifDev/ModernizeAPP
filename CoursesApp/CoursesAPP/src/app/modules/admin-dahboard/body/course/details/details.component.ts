import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/Models/ICourse';
import { CourseService } from 'src/app/services/course.service';
import {DomSanitizer} from '@angular/platform-browser';
import { StudentCourseService } from 'src/app/services/student-course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy  {
id!:number;
coursedata!:ICourse;
start!:string;
NumOfStudents!:number;
getCourseByIdSubscription!: Subscription;
GetCourseCountOfStudentSubscription!: Subscription;
  constructor(private actrouter:ActivatedRoute,private std_Crs:StudentCourseService,private Course:CourseService) { 
this.actrouter.paramMap.subscribe(res=>{
this.id=parseInt(res.get("id")||'');
console.log(this.id);



})
  }


  ngOnInit(): void {
    console.log(this.id);
    
this.getCourseByIdSubscription=this.Course.GetByID(this.id).subscribe(result=>{
console.log(result.data);
  this.start=result.data.startDate.toString();
  (<HTMLInputElement>document.getElementById("start")).value=this.start.substring(0,10);
this.coursedata=result.data;

})
this.GetCourseCountOfStudentSubscription=this.std_Crs.GetCourseCountOfStudent(this.id).subscribe(result=>{
  this.NumOfStudents=result.data;
})
  }

  ngOnDestroy(): void {
    this.GetCourseCountOfStudentSubscription.unsubscribe();
    this.getCourseByIdSubscription.unsubscribe();
   }
}
