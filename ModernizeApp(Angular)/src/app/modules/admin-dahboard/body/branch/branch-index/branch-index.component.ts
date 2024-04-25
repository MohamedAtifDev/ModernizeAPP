import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BtncallrenderComponent } from '../../btncallrender/btncallrender.component';
import { UpdateRenderCallComponent } from '../../update-render-call/update-render-call.component';
import { DeleteRenderCallComponent } from '../../delete-render-call/delete-render-call.component';
import Swal from 'sweetalert2';
import { IBranch } from 'src/app/Models/IBranch';
import { BranchService } from 'src/app/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-index',
  templateUrl: './branch-index.component.html',
  styleUrls: ['./branch-index.component.css']
})
export class BranchIndexComponent implements OnInit {
  subject = new BehaviorSubject(true);
  deleteOperationSuccessfulSubscription!: Subscription;
 currentid:number=0;
cols:ColDef[]=[
 {field:"id",maxWidth:100},
 {field:"name"},
 {field:"location"},

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
         text: "Are you Sure You Want to delete that Branch?",
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
rows:IBranch[]=[];
defaultcoldif={sortable:true,filter:true}

constructor(private Branch:BranchService,private taost:ToastrService,private router:Router) {


}
 ngOnInit(): void {
  this.subject.subscribe(this.Branch.GetAll);
this.Branch.GetAll().subscribe(result=>{
         
         
  this.rows=result.data;
  console.log(this.rows);
  
 })
   this.deleteOperationSuccessfulSubscription=this.subject.asObservable().subscribe(x=>{
     console.log(x);
     
     if(x){
       this.Branch.GetAll().subscribe(result=>{
         
         
         this.rows=result.data;
         console.log(this.rows);
         
        })
     }
   })
 
 }

 DetailsClicked(params:any){
   this.router.navigate(['Admin/Branch/Details/'+params+''])

 }

 updateClicked(field:any){
   this.router.navigate(['/Admin/Branch/Update/'+field+''])
 }
 
Deleteclicked(params:any){
this.Branch.Delete(params).subscribe(result=>{
 if(result.code==200){
   this.taost.success("Branch Deleted Successfully","",{
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

}
