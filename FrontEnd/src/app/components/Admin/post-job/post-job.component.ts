import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';  // correct import of class
import { EventItem } from 'src/app/models/event.model';  // this is an interface, not service
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent {
  isSubmitting = false;
  
  event: EventItem = {
    title: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private eventService: EventService) {}


  title='';
  date='';
  time='';
  location='';
  price='';
  imageUrl='';

  message = '';

  async submitEvent() {
    if (this.isSubmitting) return; // Prevent double submission
    
    this.isSubmitting = true;
    console.log("Submitting event:");
    
    try {
      // Get user details from sessionStorage
      const userId = sessionStorage.getItem('userId');
      const userRole = sessionStorage.getItem('roles');
      console.log("User ID:", userId);
      console.log("User Role:", userRole);

      if (!userId || !userRole) {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please login to post an event',
          confirmButtonColor: '#d33'
        });
        return;
      }

      const payload = {
        title: this.title,
        date: this.date,
        time: this.time,
        location: this.location,
        price: this.price,
        imageUrl: this.imageUrl,
        uplodetBy: userId,
        role: userRole
      };
      console.log("Payload to be sent:", payload);
      const response = await this.eventService.createEvent(payload);
      this.message = 'Registration successful!';
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Event posted successfully!',
        confirmButtonColor: '#3085d6'
      });

      // Clear form after successful submission
      this.clearForm();

    } catch (error) {
      console.error('Registration error:', error);
      this.message = 'Registration failed!';

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to post the event. Please try again.',
        confirmButtonColor: '#d33'
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  private clearForm(): void {
    this.title = '';
    this.date = '';
    this.time = '';
    this.location = '';
    this.price = '';
    this.imageUrl = '';
  }
}


