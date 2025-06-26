import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ChangeDetectorRef } from '@angular/core'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.css']
})
export class EventRequestComponent implements OnInit {

  eventList: any[] = [];
  selectedEvent: any = null;
  isProcessing = false;

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

  async updateEventStatus(id: String, status: 'ACCEPTED' | 'REJECTED') {
    if (this.isProcessing) return;

    try {
      this.isProcessing = true;

      const result = await Swal.fire({
        title: `Are you sure you want to ${status.toLowerCase()} this event?`,
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: status === 'ACCEPTED' ? '#28a745' : '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: `Yes, ${status.toLowerCase()} it!`
      });

      if (result.isConfirmed) {
        await this.eventService.updateEventStatus(id, status).toPromise();
        
        Swal.fire({
          title: 'Success!',
          text: `Event has been ${status.toLowerCase()}`,
          icon: 'success',
          confirmButtonColor: '#28a745'
        });

        // Reload event details to show updated status
        this.loadEvents();
      }
    } catch (error) {
      console.error('Error updating event status:', error);
      Swal.fire({
        title: 'Error!',
        text: `Failed to ${status.toLowerCase()} the event`,
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      this.isProcessing = false;
    }
  }

  updateEvent(): void { 

    console.log("🔁 Submitting update:", this.selectedEvent); 
    if (this.selectedEvent && this.selectedEvent.id) {
      this.eventService.updateEventStatus(this.selectedEvent.id, this.selectedEvent).subscribe({
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
