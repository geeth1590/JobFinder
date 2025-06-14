import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { DashboardComponent } from './components/User/dashboard/dashboard.component';
import { AboutComponent } from './components/User/about/about.component';
import { ContactComponent } from './components/User/contact/contact.component';
// import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
// import { DashboardComponent2 } from './components/Admin/dashboard/dashboard.component';
import { UserProfileComponent} from './components/Admin/user-profile/user-profile.component';
import { PostJobComponent } from './components/Admin/post-job/post-job.component';
import { JobREquestComponent } from './components/Admin/job-request/job-request.component';
import { EventTableComponent } from './components/Admin/event-table/event-table.component';
import { EventDetailsComponent } from './components/User/event-details/event-details.component';
import { ViweCompenyDetailsComponent } from './components/Admin/viwe-compeny-details/viwe-compeny-details.component';
import { CompenyDashboardComponent } from './components/compeny/compeny-dashboard/compeny-dashboard.component';
import { PostJobCompanyComponent } from './components/compeny/post-job-company/post-job-company.component';
import { EventRequestComponent } from './components/Admin/event-request/event-request.component';


const routes: Routes = [

  { path:"",redirectTo:'dashboard',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  // { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'AdminDashboard', component:AdminDashboardComponent},
  // { path: 'Adashboard', component: DashboardComponent2 }
  { path: 'UProfile', component:UserProfileComponent},
  { path: 'jobPost', component:PostJobComponent},
  { path: 'jobRequest' , component:JobREquestComponent},
  { path: 'eventTable' , component:EventTableComponent},
  { path: 'event-detail/:id' , component:EventDetailsComponent},
  { path: 'viwe_compeny_details' , component:ViweCompenyDetailsComponent},
  { path: 'compenyDashboard' , component:CompenyDashboardComponent},
  { path: 'postJobCompany' , component:PostJobCompanyComponent},
   { path: 'eventRequest' , component:EventRequestComponent}

    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
