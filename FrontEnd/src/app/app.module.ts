import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { DashboardComponent } from './components/User/dashboard/dashboard.component';
import { NavbarComponent } from './components/User/navbar/navbar.component';
import { EventsComponent } from './components/User/events/events.component';
import { SearchBarComponent } from './components/User/search-bar/search-bar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './components/User/about/about.component';
import { ContactComponent } from './components/User/contact/contact.component';
import { FooterComponent } from './components/User/footer/footer.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './components/Admin/user-profile/user-profile.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './components/Admin/side-bar/side-bar.component';
import { PostJobComponent } from './components/Admin/post-job/post-job.component';
import { JobREquestComponent } from './components/Admin/job-request/job-request.component';
// import { CompanySignupComponent, CompanyDetailsComponent } from './components/Admin/company-details/company-details.component';
import { EventTableComponent } from './components/Admin/event-table/event-table.component';
import { EventDetailsComponent } from './components/User/event-details/event-details.component';
import { ViweCompenyDetailsComponent } from './components/Admin/viwe-compeny-details/viwe-compeny-details.component';
import { CompenyDashboardComponent } from './components/compeny/compeny-dashboard/compeny-dashboard.component';
import { PostJobCompanyComponent } from './components/compeny/post-job-company/post-job-company.component';
import { EventRequestComponent } from './components/Admin/event-request/event-request.component';
import { JobSeekrProfileComponent } from './components/User/job-seekr-profile/job-seekr-profile.component';
import { GenarateReportComponent } from './components/Admin/genarate-report/genarate-report.component';
import { RegisterCompanyComponent } from './components/compeny/register-company/register-company.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    EventsComponent,
   SearchBarComponent,
    //  SidebarComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    SideBarComponent,
    PostJobComponent,
    JobREquestComponent,
    EventTableComponent,
    EventDetailsComponent,
    ViweCompenyDetailsComponent,
    CompenyDashboardComponent,
    PostJobCompanyComponent,
    EventRequestComponent,
    JobSeekrProfileComponent,
    GenarateReportComponent,
    RegisterCompanyComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
