import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ChangeDetectorRef } from '@angular/core'; 

import { Router } from '@angular/router';

@Component({
  selector: 'app-compeny-dashboard',
  templateUrl: './compeny-dashboard.component.html',
  styleUrls: ['./compeny-dashboard.component.css']
})
export class CompenyDashboardComponent implements OnInit {
statsData: any;
viewJobDetails(arg0: any) {
throw new Error('Method not implemented.');
}
activeJobs: any;
manageJobs() {
throw new Error('Method not implemented.');
}
viewAllApplications() {
throw new Error('Method not implemented.');
}
   eventList: any[] = [];
   selectedEvent: any = null;
   page: number = 1;
   pageSize: number = 5;

  companyName = 'Tech Solutions Inc.';
  companyIndustry = 'Information Technology';
  companyLogo = 'assets/company-logo.png';
  unreadNotifications = 3;
  
  // Analytics Data
  totalApplications = 156;
  applicationTrend = 12;
  activeJobsCount = 8;
  profileViews = 1234;
  viewsTrend = 23;

  // Search functionality
  searchTerm = '';
  applications: any;

    constructor(private eventService: EventService,
                 private cdr: ChangeDetectorRef
     ) {}

     ngOnInit(): void {
    this.loadEvents();
    this.companyName = sessionStorage.getItem('username') || 'Default Company';
  }

  loadEvents(): void {
  const compenyId = sessionStorage.getItem("userId");
  console.log("📦 Loading events for company ID:", compenyId);
  console.log("company id ",compenyId)

  if (!compenyId) {
    console.error("❌ Company ID not found in session storage");
    return;
  }

  this.eventService.getEventsByCompenyId(compenyId).subscribe({
    next: (response: any) => {
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


  deleteEvent(id: string): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(id).subscribe({
        next: (response: any) => {
          if (response.status) {
            alert("✅ Event deleted successfully.");
            this.loadEvents(); // Refresh the list
          } else {
            alert("⚠️ Failed to delete event: " + response.message);
          }
        },
        error: (err: any) => {
          console.error("❌ Error deleting event:", err.message || err);
          alert("❌ Error deleting event.");
        }
      });
    }
  }

   editEvent(event: any): void {
    console.log("📤 .....................", this.selectedEvent);

     console.log("📝 Editing event:", event);
    this.selectedEvent = { ...event };
      this.cdr.detectChanges(); 
  }

  get paginatedEvents() {
  const start = (this.page - 1) * this.pageSize;
  return this.eventList.slice(start, start + this.pageSize);
}
  
  toggleNotifications() {
    // Implement notifications toggle
  }

  get filteredApplications() {
    return this.applications.filter((app: { name: string; position: string; }) => 
      app.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private loadDashboardData() {
    // Implement dashboard data loading
  }
}
