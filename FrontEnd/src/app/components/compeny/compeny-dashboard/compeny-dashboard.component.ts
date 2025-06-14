import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compeny-dashboard',
  templateUrl: './compeny-dashboard.component.html',
  styleUrls: ['./compeny-dashboard.component.css']
})
export class CompenyDashboardComponent implements OnInit {
  companyName = 'Your Company Name';
  companyIndustry = 'Technology';
  
  statsData = [
    { icon: 'work', title: 'Active Jobs', value: 25 },
    { icon: 'people', title: 'Total Applications', value: 150 },
    { icon: 'person_search', title: 'Interviews Scheduled', value: 12 },
    { icon: 'how_to_reg', title: 'Hired', value: 8 }
  ];

  recentApplications = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'assets/avatar.png',
      position: 'Senior Developer',
      appliedDate: new Date(),
      status: 'New'
    }
    // Add more application data
  ];

  activeJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      type: 'Full-time',
      applications: 12,
      location: 'Remote'
    }
    // Add more job data
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Add API calls to load real data
  }

  viewAllApplications() {
    this.router.navigate(['/applications']);
  }

  manageJobs() {
    this.router.navigate(['/jobs/manage']);
  }

  viewApplication(id: number) {
    this.router.navigate(['/applications', id]);
  }

  editApplication(id: number) {
    this.router.navigate(['/applications', id, 'edit']);
  }

  viewJobDetails(id: number) {
    this.router.navigate(['/jobs', id]);
  }
}
