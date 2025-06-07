import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  [x: string]: any;
  eventId!: number;
 event: any = null;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

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
        console.log(">>>>>>",this.event)
      },
      error: (err) => {
        console.error('Error loading event details', err);
      }
    });
  }

  requestJObs(){
    const token = sessionStorage.getItem('token')

    if(token){
      console.log('Continue Request process')
      
    }else{
      console.log('plz log !!!');
      alert('please log first');
    //   this.route.
    // this.router.navigate(['/login']);
      
    }

  }



  // event = {
  //   title: 'Yugaswara (යුගාස්වර)',
  //   date: 'Saturday, Jun 14',
  //   time: '07:00 PM IST',
  //   location: 'Museaus College',
  //   organizer: 'V4 ENTERTAINMENT',
  //   description: `
  //     ශ්‍රී ලංකාවේ සම්භාවනීය කලාකරුවන් රැසකගේ සංගීතමය රසවින්දනයක්! 
  //     සන්සුන් වූ සන්ධ්‍යා වාතයත් සමග ජීවිතය නැවත සටහන් කරගන්න...
  //   `,
  //   policies: [
  //     'Only the E-Ticket with QR Code provided by MyTicketsLK will be accepted.',
  //     'Tickets will not be redeemed for any forwarded or screenshots.',
  //     'A valid NIC or Passport will be required.',
  //     'Entry permitted for children (10 Yrs and above) only with a valid ticket.'
  //   ],
  //   ticketOptions: [
  //     { label: '10000 LKR ODC - RESERVED', price: '10,000 LKR' },
  //     { label: '7500 LKR ODC - RESERVED', price: '7,500 LKR' }
  //   ],
  //   imageUrl: 'https://yourcdn.com/yugaswara.jpg' // replace with actual image
  // };
}

