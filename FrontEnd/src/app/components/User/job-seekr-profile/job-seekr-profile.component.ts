import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-seekr-profile',
  templateUrl: './job-seekr-profile.component.html',
  styleUrls: ['./job-seekr-profile.component.css']
})
export class JobSeekrProfileComponent implements OnInit {

  JeboSeekerName:String='';
  userProfile = {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    location: 'Colombo, Sri Lanka',
    avatar: 'assets/avatar.jpg',
    coverPhoto: 'assets/cover.jpg',
    about: 'Experienced software engineer with a passion for building scalable applications...',
    skills: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'Tech Corp',
        companyLogo: 'assets/company1.png',
        duration: 'Jan 2022 - Present',
        description: 'Leading the frontend development team...'
      },
      // ...more experience items
    ],
    stats: {
      applications: 24,
      interviews: 8,
      savedJobs: 15
    }
  };
  eventList: any[] = [];
  userList: any[] = [];
  showAboutUs: boolean = true;

  constructor(private userService: UserService,
     private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserDetails();
    this.JeboSeekerName = sessionStorage.getItem('username') || 'Default Company';

  }

  loadUserDetails(): void {
  const jobSeekerId = sessionStorage.getItem("userId");
  console.log("📦 Loading events for company ID:", jobSeekerId);
  console.log("company id ",jobSeekerId)

  if (!jobSeekerId) {
    console.error("❌ Company ID not found in session storage");
    return;
  }

   this.userService.getDetailsByCompenyId(jobSeekerId).subscribe({
    next: (response: any) => {
      console.log("Response from getDetailsByCompenyId:", response);
      
      if (response?.status && Array.isArray(response.payload)) {
        this.userList = response.payload[0];
        console.log("✅ Events loaded:", response.payload[0]);
      } else {
        console.warn("⚠️ Invalid response format or no data:", response);
      }
    },
    error: (err: any) => {
      console.error("❌ Error fetching events:", err.message || err);
    }
  });
}

onOverviewClick(){
  this.showAboutUs = true;
}

onJobReqBtn(){
    this.showAboutUs = false;

  const jobSeekerId = sessionStorage.getItem("userId");
  console.log("📦 Loading events for company ID:", jobSeekerId);
  console.log("company id ",jobSeekerId)

  if (!jobSeekerId) {
    console.error("❌ Company ID not found in session storage");
    return;
  }

   this.userService.getEventByUser(jobSeekerId).subscribe({
    next: (response: any) => {
      console.log("Response from getEventByUser:", response);
      
      if (response?.status && Array.isArray(response.payload)) {
        this.eventList = response.payload[0];
        console.log("✅ Events loaded:", response.payload[0]);
      } else {
        console.warn("⚠️ Invalid response format or no data:", response);
      }
    },
    error: (err: any) => {
      console.error("❌ Error fetching events:", err.message || err);
    }
  });
}
}