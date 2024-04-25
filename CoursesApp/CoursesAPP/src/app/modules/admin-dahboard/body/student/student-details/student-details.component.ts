import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStudent } from 'src/app/Models/IStudent';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit,OnDestroy {
studentdata!:IStudent;
id!:string;
getStudentSubscription!:Subscription;
  constructor(private student:StudentService,private actroute:ActivatedRoute) {

    this.actroute.paramMap.subscribe(data=>{
      console.log(data);
      
      this.id=data.get("id")||'';
      console.log(this.id);
      
    })
   }
  ngOnDestroy(): void {
this.getStudentSubscription.unsubscribe();
  }

  ngOnInit(): void {
this.getStudentSubscription=this.student.GetById(this.id).subscribe(result=>{
  this.studentdata=result.data;
  console.log(this.studentdata);
  
})
  }

}
