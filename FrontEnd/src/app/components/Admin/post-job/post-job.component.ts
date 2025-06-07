import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';  // correct import of class
import { EventItem } from 'src/app/models/event.model';  // this is an interface, not service
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent {

 
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
    try {
      const payload = {
        title: this.title,
        date: this.date,
        time: this.time,
        location: this.location,
        price: this.price,
        imageUrl: this.imageUrl
      };

      const response = await this.eventService.createEvent(payload);
      this.message = 'Registration successful!';
      // this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
      this.message = 'Registration failed!';
    }
  }}


