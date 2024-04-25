import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { CourseComponent } from './body/course/course.component';
import { DetailsComponent } from './body/course/details/details.component';
import { IndexComponent } from './body/course/index/index.component';
import { CreateComponent } from './body/course/create/create.component';
import { UpdateComponent } from './body/course/update/update.component';
import { InstructorIndexComponent } from './body/instructor/instructor-index/instructor-index.component';
import { InstrustorDetailsComponent } from './body/instructor/instrustor-details/instrustor-details.component';
import { InstructorCraeteComponent } from './body/instructor/instructor-craete/instructor-craete.component';
import { InstructorUpdateComponent } from './body/instructor/instructor-update/instructor-update.component';
import { BranchIndexComponent } from './body/branch/branch-index/branch-index.component';
import { BranchDetailsComponent } from './body/branch/branch-details/branch-details.component';
import { BranchCreateComponent } from './body/branch/branch-create/branch-create.component';
import { BranchUpdateComponent } from './body/branch/branch-update/branch-update.component';
import { BranchCourseComponent } from './body/branch-course/branch-course.component';
import { BranchCourseIndexComponent } from './body/branch-course/branch-course-index/branch-course-index.component';
import { BranchCourseCreateComponent } from './body/branch-course/branch-course-create/branch-course-create.component';
import { BranchCourseDeleteComponent } from './body/branch-course/branch-course-delete/branch-course-delete.component';
import { ProfileComponent } from './body/profile/profile.component';
import { StudentIndexComponent } from './body/student/student-index/student-index.component';
import { StudentDetailsComponent } from './body/student/student-details/student-details.component';
import { PaymentComponent } from './body/payment/payment.component';
import { PaymentIndexComponent } from './body/payment/payment-index/payment-index.component';
import { PaymentDetailsComponent } from './body/payment/payment-details/payment-details.component';
import { SendEmailComponent } from './body/send-email/send-email.component';

const routes: Routes = [{path:"",component:BodyComponent,children:[
{path:"SendEmail",component:SendEmailComponent},
 {path:"Profile",component:ProfileComponent},{path:"BranchCourse",component:BranchCourseComponent,children:[{path:"Delete",component:BranchCourseDeleteComponent},{path:"",redirectTo:"Index",pathMatch:"full"},{path:"Assign",component:BranchCourseCreateComponent},{path:"Index",component:BranchCourseIndexComponent}]}, {path:'Branch',children:[{path:"Update/:id",component:BranchUpdateComponent},{path:"Create",component:BranchCreateComponent},{path:"Details/:id",component:BranchDetailsComponent},{path:'',redirectTo:'Index',pathMatch:'full'},{path:"Index",component:BranchIndexComponent}]},{path:'home',component:HomeComponent},{path:'',redirectTo:'home',pathMatch:'full'},
 {path:'Payment',component:PaymentComponent,children:[{path:'Index',component:PaymentIndexComponent},{path:"",redirectTo:'Index',pathMatch:'full'},{path:'Details/:id',component:PaymentDetailsComponent}]},
 {path:'Student',children:[{
  path:'Index',component:StudentIndexComponent
 },{path:'',redirectTo:'Index',pathMatch:'full'},{path:'Details/:id',component:StudentDetailsComponent}]},{path:'Instructor',children:[{path:"Index",component:InstructorIndexComponent},{path:'Create',component:InstructorCraeteComponent},{path:"",redirectTo:"Index",pathMatch:"full"},{path:"Details/:id",component:InstrustorDetailsComponent},{path:"Update/:id",component:InstructorUpdateComponent}]},{path:'Course',component:CourseComponent,children:[{path:'Details/:id',component:DetailsComponent},{path:"",redirectTo:"Index",pathMatch:'full'},{path:"Index",component:IndexComponent},{path:"Create",component:CreateComponent},{path:"Update/:id",component:UpdateComponent}]},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDahboardRoutingModule { }
