import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // register job seeker using HttpClient (better for Angular)
  registerJobSeeker(user: any) {
    return lastValueFrom(this.http.post(`${this.API_URL}/signup/job_seeker`, user));
  }



  loginJobSeeker(user: any) {
    return lastValueFrom(this.http.post(`${this.API_URL}/signin`, user));
  }


  // async resetPassword(data: any) {
  //   return axios.post(`${this.API_URL}/reset-password`, data);
  // }
  async resetPassword(data: any) {
    return await lastValueFrom(this.http.post(`${this.API_URL}/reset-password`, data));
  }
  
 
}
