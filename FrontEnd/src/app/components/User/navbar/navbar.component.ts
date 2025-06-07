import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showLoginBtn:boolean=false

  constructor(private router: Router) {
    const token = sessionStorage.getItem('token')
    if (token){
      this.showLoginBtn = true
    }else{
      this.showLoginBtn = false
    }
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
}
