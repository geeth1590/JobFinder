import { Component ,OnInit  } from '@angular/core';
import { EventItem } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

// interface Event {
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   price: string;
//   imageUrl: string;
//   link: string;
// }

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
onFilterChange($event: string[]) {
throw new Error('Method not implemented.');
}

   eventList: any[] = [];
   searchQuery: string = '';
   filteredEvents: any[] = [];
  // serId: string | null = null;
   userId = sessionStorage.getItem('userId');
   
 
  constructor(private eventService: EventService) {}
  
   ngOnInit(): void {
     console.log("User ID from sessionStorage:", this.userId);
  this.eventService.getEvents().subscribe({
    next: (response: any) => {
      if (response && response.status && Array.isArray(response.payload)) {
        this.eventList = response.payload[0];
        this.filteredEvents = this.eventList;
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

 onSearchChanged(query: string): void {
  this.searchQuery = query.toLowerCase();
  this.filteredEvents = this.eventList.filter(event =>
    event.title?.toLowerCase().includes(this.searchQuery) ||
    event.location?.toLowerCase().includes(this.searchQuery) ||
    event.date?.toLowerCase().includes(this.searchQuery)
  );
 }

//   ngOnInit(): void {
//     this.events = [
//     {
//       title: "Setup LED",
//       date: "Apr 05, 2025",
//       time: "08:00 AM IST",
//       location: "St Clair's Falls",
//       price: "3,500 LKR upwards",
//       imageUrl: "280WatB.jpg",
//       link: ""
//     },
//     {
//       title: "අපෙ ගෙදර වඩක් තියෙනව",
//       date: "Apr 05, 2025",
//       time: "10:00 AM onwords",
//       location: "Colombo 03",
//       price: "100,000 LKR upwards",
//       imageUrl: "assets/dance-festival.jpg",
//       link: ""
//     },
//     {
//       title: "Election Duty",
//       date: "Apr 05, 2025",
//       time: "06:00 PM IST",
//       location: "Gampaha Kachcheri",
//       price: "2,500 LKR upwards a day",
//       imageUrl: "assets/music-event.jpg",
//       link: ""
//     },
//     {
//       title: "Stock Countin",
//       date: "Apr 11, 2025",
//       time: "08:00 AM IST",
//       location: "Kalaniya Uniliver",
//       price: "35,000 LKR upwards",
//       imageUrl: "assets/rope-jump.jpg",
//       link: ""
//     }
//   ];

//   this.filteredEvents = [...this.events];
// }


// handleSearch(query: string): void {
//   const lower = query.toLowerCase();
//   this.eventList = this.events.filter(event =>
//     event.title.toLowerCase().includes(lower) ||
//     event.date.toLowerCase().includes(lower) ||
//     event.location.toLowerCase().includes(lower)
//   );
// }






}
