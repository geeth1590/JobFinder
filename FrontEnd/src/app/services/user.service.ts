import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }
 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }


  requestJob(data: any, headers: HttpHeaders): Observable<any> {
  console.log("Requesting job with data:", data);
 
  return this.http.post(`${this.API_URL}/request`, data, { headers });
}

getDetailsByCompenyId(jobSeekerId: string): Observable<any> {
    return this.http.get(
    `${this.API_URL}/usersDetails/${jobSeekerId}/userid`,
    
  );
}


getEventByUser(jobSeekerId: string): Observable<any> {
    return this.http.get(
    `${this.API_URL}/getEventByUser/${jobSeekerId}`,
  );
}



}
