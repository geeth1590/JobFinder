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

  constructor(private http: HttpClient) {}

 
  createEvent (user: any) {
      return lastValueFrom(this.http.post(`${this.API_URL}/saveEvent`, user));
    }
  
   getEvents(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getEvent`);
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


}
