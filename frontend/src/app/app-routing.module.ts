import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { MoreDetialsComponent } from './pages/more-detials/more-detials.component';
import { StatusComponent } from './pages/status/status.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminJobDetialsComponent } from './pages/admin-job-detials/admin-job-detials.component';
import { ViewApplicantsComponent } from './pages/view-applicants/view-applicants.component';
import { PostJobComponent } from './pages/post-job/post-job.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'adminlogin',component:AdminLoginComponent},
  {path:'moredetials/:job_id',component:MoreDetialsComponent},
  {path:'application',component:StatusComponent},
  {path:'adminDashboard/:id',component:AdminDashboardComponent},
  {path:'adminJobDetials/:job_id',component:AdminJobDetialsComponent},
  {path:'viewApplicants/:job_id',component:ViewApplicantsComponent},
  {path:'postjob',component:PostJobComponent},
  {path:'editpost',component:PostJobComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
 
