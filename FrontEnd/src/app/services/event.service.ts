// src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event.model';
import { lastValueFrom } from 'rxjs';

// Event interface (TypeScript type)


@Injectable({
  providedIn: 'root'
})
export class EventService {
 
  

  private API_URL = 'http://localhost:8080/api/event'; // Adjust as needed
  requestJob: any;

  constructor(private http: HttpClient) {}

 
  createEvent (user: any) {
    console.log("user id ", user.uplodetBy)
    console.log("Creating event:", user);
      return lastValueFrom(this.http.post(`${this.API_URL}/saveEvent`, user));
    }
  
   getEvents(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getEvent`); 
    }

    // getPending event for admin
    getEventsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/admin/pending`);
    }

    getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getById`, {
      params: { id: id.toString() }
    });
  }
  

  deleteEvent(id: string): Observable<any> {
  return this.http.delete(`${this.API_URL}/deleteEvent/${id}`);
}

updateEvent(id: number, eventData: any): Observable<any> {
  console.log("event service............");
  return this.http.put(`${this.API_URL}/updateEvent/${id}`, eventData);
}

 updateEventStatus(id: String, status: string): Observable<any> {
  console.log("Updating event status:", id, status);
    const payload = { status: status };
    return this.http.patch(`${this.API_URL}/events/${id}/status`, payload);
  }

//   getEventsByCompenyId(compenyId: string): Observable<any> {
//     console.log("company id........", compenyId )
//   return this.http.get(`${this.API_URL}/event/compeny/${compenyId}/events`);
// }

getEventsByCompenyId(compenyId: string): Observable<any> {
  // const token = sessionStorage.getItem('token');
  // console.log("token ",token)
  // const headers = new HttpHeaders(token
  //   ? { Authorization: `Bearer ${token}` }
  //   : {});

  return this.http.get(
    `${this.API_URL}/compeny/${compenyId}/events`,
    
  );
}


getEventCount(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getEventCount`);
    }

}
