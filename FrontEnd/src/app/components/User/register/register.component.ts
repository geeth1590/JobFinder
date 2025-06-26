import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword = false;

  username = '';
  email = '';
  password = '';
  address = '';
  age: number = 0; 


  message = '';


  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
  try {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
      address: this.address,
      age: this.age,
      // base64Image: this.base64Image
    };

    const response = await this.authService.registerJobSeeker(payload);
    console.log('Registration response:', response);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Registration successful!',

    });
    this.router.navigate(['/login']);

    this.message = 'Registration successful!';
    // this.router.navigate(['/login']);
  } catch (error) {
    console.error('Registration error:', error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Registration failed!',
    });

    this.message = 'Registration failed!';
  }
}



}
