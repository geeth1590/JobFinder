import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  dropdownOpen1 = false;
  dropdownOpen2 = false;


// toggleDropdown(event: Event) {
//   event.preventDefault(); // prevent page jump
//   this.dropdownOpen = !this.dropdownOpen;
// }

// dropdownOpen = false;

toggleDropdown1() {
  this.dropdownOpen1 = !this.dropdownOpen1;
}

toggleDropdown2() {
  this.dropdownOpen2 = !this.dropdownOpen2;
}


}
