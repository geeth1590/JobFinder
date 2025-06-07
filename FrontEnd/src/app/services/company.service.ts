import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event.model';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompenyService {
 
  

  private API_URL = 'http://localhost:8080/api/compeny'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getCompeny(): Observable<any> {
    console.log(".........................................")
    return this.http.get<any>(`${this.API_URL}/getCompeny`);
    }

    deleteCompeny(id: string): Observable<any> {
  return this.http.delete(`${this.API_URL}/deleteEvent/${id}`);
}

updateCompeny(id: number, compenyData: any): Observable<any> {
  console.log("event service............");
  return this.http.put(`${this.API_URL}/updatecompeny/${id}`, compenyData);
}


}