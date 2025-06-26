import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  [x: string]: any;
  eventId!: number;
  event: any = null;
  isRequestSent: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.eventId = idParam ? Number(idParam) : 0;
      if (this.eventId) {
        this.loadEventDetails(this.eventId);
      }
    });
  }

  loadEventDetails(id: number): void {
    this.eventService.getById(id).subscribe({

      next: (res) => {
        this.event = Array.isArray(res.payload[0]) ? res.payload[0][0] : null;
        console.log("id .....", id)
        console.log(">>>>>>", this.event)
      },
      error: (err) => {
        console.error('Error loading event details', err);
      }
    });
  }



requestJobs() {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const userRole = sessionStorage.getItem('roles');

  console.log('User ID:', userId);

  if (!token || !userId) {
    Swal.fire('Unauthorized', 'User not authenticated.', 'warning');
    return;
  }

  if (!this.eventId) {
    Swal.fire('No Event Selected', 'Please select an event before requesting.', 'info');
    return;
  }

  const requestBody = {
    eventId: this.eventId,
    userId: Number(userId),
    userRole: String(userRole)
  };

  console.log("Requesting job with data:", requestBody);

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  Swal.fire({
    title: 'Sending Request...',
    didOpen: () => Swal.showLoading(),
    allowOutsideClick: false
  });

  this.userService.requestJob(requestBody, headers).subscribe({
    next: (res: any) => {
      Swal.close();
      Swal.fire('Success', 'Request sent successfully!', 'success');
      this.isRequestSent = true;  // Hide the button
    },
    error: (err: any) => {
      Swal.close();
      Swal.fire(
        'Error',
        err?.error?.message || err.message || 'Unknown error',
        'error'
      );
    }
  });
}




}

