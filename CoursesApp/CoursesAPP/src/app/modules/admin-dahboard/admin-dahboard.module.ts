import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDahboardRoutingModule } from './admin-dahboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';

import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './body/course/course.component';
import{AgGridAngular, AgGridModule} from'ag-grid-angular';
import { BtncallrenderComponent } from './body/btncallrender/btncallrender.component';
import { UpdateRenderCallComponent } from './body/update-render-call/update-render-call.component';
import { DeleteRenderCallComponent } from './body/delete-render-call/delete-render-call.component'
import 'ag-grid-enterprise';
import { DetailsComponent } from './body/course/details/details.component';
import { IndexComponent } from '../admin-dahboard/body/course/index/index.component';
import { CreateComponent } from './body/course/create/create.component'
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './body/course/update/update.component';
import { InstructorComponent } from './body/instructor/instructor.component';
import { InstructorIndexComponent } from './body/instructor/instructor-index/instructor-index.component';
import { InstrustorDetailsComponent } from './body/instructor/instrustor-details/instrustor-details.component';
import { InstructorCraeteComponent } from './body/instructor/instructor-craete/instructor-craete.component';
import { InstructorUpdateComponent } from './body/instructor/instructor-update/instructor-update.component';
import { BranchComponent } from './body/branch/branch.component';
import { BranchIndexComponent } from './body/branch/branch-index/branch-index.component';
import { BranchDetailsComponent } from './body/branch/branch-details/branch-details.component';
import { BranchCreateComponent } from './body/branch/branch-create/branch-create.component';
import { BranchUpdateComponent } from './body/branch/branch-update/branch-update.component';
import { BranchCourseComponent } from './body/branch-course/branch-course.component';
import { BranchCourseIndexComponent } from './body/branch-course/branch-course-index/branch-course-index.component';
import { BranchCourseCreateComponent } from './body/branch-course/branch-course-create/branch-course-create.component';
import { BranchCourseDeleteComponent } from './body/branch-course/branch-course-delete/branch-course-delete.component';
import { ProfileComponent } from './body/profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StudentComponent } from './body/student/student.component';
import { StudentIndexComponent } from './body/student/student-index/student-index.component';
import { StudentDetailsComponent } from './body/student/student-details/student-details.component';
import { PaymentComponent } from './body/payment/payment.component';
import { PaymentIndexComponent } from './body/payment/payment-index/payment-index.component';
import { PaymentDetailsComponent } from './body/payment/payment-details/payment-details.component';
import { SendEmailComponent } from './body/send-email/send-email.component';
@NgModule({
  declarations: [
    SidebarComponent,
    BodyComponent,
    HomeComponent,
    HeaderComponent,
    CourseComponent,
    BtncallrenderComponent,
    UpdateRenderCallComponent,
    DeleteRenderCallComponent,
    DetailsComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent,
    InstructorComponent,
    IndexComponent,
    InstructorIndexComponent,
    InstrustorDetailsComponent,
    InstructorCraeteComponent,
    InstructorUpdateComponent,
    BranchComponent,
    BranchIndexComponent,
    BranchDetailsComponent,
    BranchCreateComponent,
    BranchUpdateComponent,
    BranchCourseComponent,
    BranchCourseIndexComponent,
    BranchCourseCreateComponent,
    BranchCourseDeleteComponent,
    ProfileComponent,
    StudentComponent,
    StudentIndexComponent,
    StudentDetailsComponent,
    PaymentComponent,
    PaymentIndexComponent,
    PaymentDetailsComponent,
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    AdminDahboardRoutingModule,
    AgGridAngular,
    HttpClientModule,
ReactiveFormsModule,

NgxSpinnerModule
  ],
  exports:[BodyComponent,SidebarComponent]
})
export class AdminDahboardModule { }
