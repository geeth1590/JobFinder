import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showLoginBtn:boolean=false
  isDropdownOpen:boolean = false;
  isDropdownOpen1:boolean = false;

  constructor(private router: Router) {
    const token = sessionStorage.getItem('token')
    if (token){
      this.showLoginBtn = true
      this.isDropdownOpen1 = true;
    }else{
      this.showLoginBtn = false
      this.isDropdownOpen1 = false;
    }
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/login']);
    }
  });
}

sinup() {
  Swal.fire({
    title: 'Go to Signup?',
    text: 'You will be redirected to the signup page.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, signup',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/register']);
    }
  });
}

login() {
  Swal.fire({
    title: 'Go to Login?',
    text: 'You will be redirected to the login page.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Yes, login',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/login']);
    }
  });
}
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown?.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
}
