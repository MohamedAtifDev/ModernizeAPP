import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ICourse } from 'src/app/Models/ICourse';
import { CourseService } from 'src/app/services/course.service';
import { BtncallrenderComponent } from '../../btncallrender/btncallrender.component';
import { UpdateRenderCallComponent } from '../../update-render-call/update-render-call.component';
import { DeleteRenderCallComponent } from '../../delete-render-call/delete-render-call.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'course-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit  {
  subject = new BehaviorSubject(true);
  deleteOperationSuccessfulSubscription!: Subscription;
 currentid:number=0;
 rowData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

// Column Definitions: Defines & controls grid columns.
colDefs: ColDef[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" }
];

// Column Definitions: Defines & controls grid columns.

cols:ColDef[]=[
 {field:"id",maxWidth:100},
 {field:"name"},
 {field:"description"},
 {field:"price" ,maxWidth:100},{field:"instructorid",headerClass:"center",cellStyle:{'text-align':'center'}},
 {
   field: 'Details',headerClass: 'Details',maxWidth:150,
   cellRenderer: BtncallrenderComponent,
   cellRendererParams: {
     clicked: (field: any) => {
     this.DetailsClicked(field);
     
     
}

}
 },

{
 field: 'Update',
 cellRenderer: UpdateRenderCallComponent,maxWidth:150,
 cellRendererParams: {
   clicked: (field: any) => {
   this.updateClicked(field)

 }
}
},{
 field: 'Delete',maxWidth:150,
 cellRenderer: DeleteRenderCallComponent,
 cellRendererParams: {
   clicked: (field: any) => {
  var x=Swal.fire({
         icon: "question",
         title: "Are you Sure?",
         text: "Are you Sure You Want to delete that Course?",
      showCancelButton:true,
      

      
       }).then(x=>{
         if(x.isConfirmed){
           this.Deleteclicked(field);
         }
         
       });
       
       
     

 }
}
}
];
rows:ICourse[]=[];
defaultcoldif={sortable:true,filter:true}

constructor(private course:CourseService,private taost:ToastrService,private router:Router) {

this.subject.subscribe(this.course.getAll);

}
 ngOnInit(): void {
   this.deleteOperationSuccessfulSubscription=this.subject.asObservable().subscribe(x=>{
     console.log(x);
     
     if(x){
       this.course.getAll().subscribe(result=>{
         console.log(result.data);
         
         this.rows=result.data;
         console.log(this.rows);
         
        })
     }
   })
 
 }

 DetailsClicked(params:any){
   this.router.navigate(['Admin/Course/Details/'+params+''])

 }

 updateClicked(field:any){
   this.router.navigate(['/Admin/Course/Update/'+field+''])
 }
 
Deleteclicked(params:any){
this.course.Delete(params).subscribe(result=>{
 if(result.code==200){
   this.taost.success("Course Deleted Successfully","",{
     progressBar:true,
     progressAnimation:'decreasing'
   });
 this.subject.next(true);

 }else{
   this.taost.error(result.message)
 }
})



}
}
