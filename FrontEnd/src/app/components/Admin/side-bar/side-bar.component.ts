import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isCollapsed = false;
  notificationCount = 3;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleNotifications() {
    // Implement notifications logic
  }

  toggleProfileMenu() {
    // Implement profile menu logic
  }
}
