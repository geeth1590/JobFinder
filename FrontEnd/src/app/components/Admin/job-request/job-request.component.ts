import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobREquestComponent implements OnInit {

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef ) {}


  updateEventStatus(arg0: any,arg1: string) {
throw new Error('Method not implemented.');
}

  eventList: any[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  searchTerm = '';

  ngOnInit() {
    this.loadEvents();
  }
  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (response: any) => {
        if (response && response.status && Array.isArray(response.payload)) {
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

  filterEvents() {
    this.filteredEvents = this.events.filter(event => 
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.currentPage = 1;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // ...existing code...
}

