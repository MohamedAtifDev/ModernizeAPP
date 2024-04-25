import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BtncallrenderComponent } from '../../btncallrender/btncallrender.component';
import { Router } from '@angular/router';
import { IStudent } from 'src/app/Models/IStudent';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.css']
})
export class StudentIndexComponent implements OnInit {
  rows:IStudent[]=[];
defaultcoldif={sortable:true,filter:true}
  cols:ColDef[]=[
    {field:"id",maxWidth:200},
    {field:"name"},
    {field:"email"},
    {field:"phone" },
    {
      field: 'Details',headerClass: 'Details',maxWidth:150,
      cellRenderer: BtncallrenderComponent,
      cellRendererParams: {
        clicked: (field: any) => {
        this.DetailsClicked(field);
        
        
   }
   
   }
    }
  ]
  constructor(private router:Router,private student:StudentService) { }

  ngOnInit(): void {
this.student.getAll().subscribe(result=>{
  this.rows=result.data
})
  }
DetailsClicked(field:any){
this.router.navigate(['/Admin/Student/Details/'+field+''])
}
}
