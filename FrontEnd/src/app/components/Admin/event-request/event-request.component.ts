import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.css']
})
export class EventRequestComponent implements OnInit {

  eventList: any[] = [];
  selectedEvent: any = null;

  constructor(private eventService: EventService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEventsAdmin().subscribe({
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
    this.selectedEvent = event;
  }

  updateEvent(): void {

    console.log("🔁 Submitting update:", this.selectedEvent); 
    if (this.selectedEvent && this.selectedEvent.id) {
      this.eventService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe({
        next: (response: any) => {
          if (response.status) {
            alert('✅ Event updated successfully.');
            this.selectedEvent = null;
            this.loadEvents();
          } else {
            alert('⚠️ Failed to update event: ' + response.message);
          }
        },
        error: (err) => {
          console.error("❌ Error updating event:", err);
          alert("❌ Error updating event.");
        }
      });
    }
  }
  cancelEdit(): void {
    this.selectedEvent = null;
    this.cdr.detectChanges(); // Ensure the view updates
  }
  isEditing(): boolean {
    return this.selectedEvent !== null;   

}}
