import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BtncallrenderComponent } from '../../btncallrender/btncallrender.component';
import { UpdateRenderCallComponent } from '../../update-render-call/update-render-call.component';
import { DeleteRenderCallComponent } from '../../delete-render-call/delete-render-call.component';
import Swal from 'sweetalert2';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { InstructorService } from 'src/app/services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-index',
  templateUrl: './instructor-index.component.html',
  styleUrls: ['./instructor-index.component.css']
})
export class InstructorIndexComponent implements OnInit,OnDestroy {
  subject = new BehaviorSubject(true);
  deleteOperationSuccessfulSubscription!: Subscription;
 currentid:number=0;

cols:ColDef[]=[
 {field:"id",maxWidth:100},
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
         text: "Are you Sure You Want to delete that Instructor And His Assigned Course?",
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
rows:Iinstructor[]=[];
defaultcoldif={sortable:true,filter:true}
  getAllInstructorsSubscription!: Subscription;

constructor(private Instructor:InstructorService,private taost:ToastrService,private router:Router) {


}

 ngOnInit(): void {
  this.subject.subscribe(this.Instructor.GetAll);
this.getAllInstructorsSubscription=this.Instructor.GetAll().subscribe(result=>{
  console.log(result.data);
  
  this.rows=result.data;
  console.log(this.rows);
  
 })
   this.deleteOperationSuccessfulSubscription=this.subject.asObservable().subscribe(x=>{
     console.log(x);
     
     if(x){
       this.Instructor.GetAll().subscribe(result=>{
         console.log(result.data);
         
         this.rows=result.data;
         console.log(this.rows);
         
        })
     }
   })
 
 }

 DetailsClicked(params:any){
   this.router.navigate(['Admin/Instructor/Details/'+params+''])

 }

 updateClicked(field:any){
   this.router.navigate(['/Admin/Instructor/Update/'+field+''])
 }
 
Deleteclicked(params:any){
this.Instructor.Delete(params).subscribe(result=>{
 if(result.code==200){
   this.taost.success("Instructor Deleted Successfully","",{
     progressBar:true,
     progressAnimation:'decreasing'
   });
 this.subject.next(true);

 }else{
   this.taost.error(result.message)
 }
})
console.log(params);
}
ngOnDestroy(): void {
  this.deleteOperationSuccessfulSubscription.unsubscribe();
  this.getAllInstructorsSubscription.unsubscribe();
    }
}
