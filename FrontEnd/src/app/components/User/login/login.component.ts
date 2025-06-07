import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {
    sessionStorage.clear()
  }

  async onLogin() {
    try {
      console.log('Trying to login...');
      const response = await this.authService.loginJobSeeker({
        username: this.username,
        password: this.password
      }) as any;

      const data = response;
console.log('Login response:', response);
      console.log('Login successful response:', response);

      if (data.roles && data.roles.includes('ROLE_JOB_SEEKER')) {
        this.message = 'Login successful!';


        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });

        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('userId', data.id);

        console.log('User roles:', data.roles);
        console.log('User ID:', String(data.id));



        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      }

      else if(data.roles && data.roles.includes('ROLE_ADMIN')) {
        // this.message = 'Access denied. You are not a job seeker.';

        // Swal.fire({
        //   icon: 'error',
        //   title: 'Access Denied',
        //   text: 'You are not authorized to access the job seeker dashboard.',
        // });

        this.message = 'Login successful!';


        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });

        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('userId', data.id);


        setTimeout(() => {
          this.router.navigate(['/AdminDashboard']);
        }, 2000);

      }
      else {

        this.message = 'Login successful!';


        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });

        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('userId', data.id);


        setTimeout(() => {
          this.router.navigate(['/AdminDashboard']);
        }, 2000);

      }

    } catch (error: any) {
      console.log('Login error:', error);

      if (error.status === 401) {
        this.message = 'Invalid username or password';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password!',
        });
      } else {
        this.message = 'An error occurred. Please try again later.';

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later!',
        });
      }
    }
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }


}
