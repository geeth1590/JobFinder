import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent {
 showPassword = false;

  username = '';
  email = '';
  password = '';
  address = '';
  age: number = 0; 
  compenyName='';


  message = '';
phoneNumber: any;

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
  try {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
      address: this.address,
      phoneNumber: this.phoneNumber,
      compenyName:this.compenyName,

      // base64Image: this.base64Image
    };

    const response = await this.authService.registerCompany(payload);
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
