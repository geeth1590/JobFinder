import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // username = '';
  // email = '';
  // password = '';
  // address ='';
  // age: number = 0;
  // message = '';
  

  // constructor(private authService: AuthService ,private  router: Router) {}

  

  // register() {
  //   alert('Logging out...');
  //   this.router.navigate(['/login']); // Redirect to login page
  // }
  
  // async onRegister() {
  //   try {
  //     const or ={
  //       username:'hello',
  //       password:'helloe2'
  //     }
  //     const response = await this.authService.registerJobSeeker({ username: this.username, email: this.email, password: this.password , address: this.address, age:this.age});
  //     this.message = 'Registration successful!';
  //   } catch (error) {
  //     this.message = 'Registration failed!';
  //   }
  // }

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
        age: this.age
      };

      const response = await this.authService.registerJobSeeker(payload);
      this.message = 'Registration successful!';
      // this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
      this.message = 'Registration failed!';
    }
  }

  register() {
    this.router.navigate(['/login']); // Redirect to login page
  }
}
