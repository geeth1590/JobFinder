import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    throw new Error('Method not implemented.');
  }
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    alert('Are you shure...');
    this.router.navigate(['/login']); // Redirect to login page
  }

  sinup(){
    alert('Are you shure...');
    this.router.navigate(['/register']);
  }
  login(){

    alert('Are you shure...');
    this.router.navigate(['/login']);
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
