import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';


  @Output() searchChanged = new EventEmitter<string>();

  onSearch(): void {
    this.searchChanged.emit(this.searchQuery.trim());
}
}