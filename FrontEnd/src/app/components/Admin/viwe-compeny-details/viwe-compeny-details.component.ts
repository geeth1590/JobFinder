import { Component, OnInit } from '@angular/core';
import { CompenyService } from '../../../services/company.service';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-viwe-compeny-details',
  templateUrl: './viwe-compeny-details.component.html',
  styleUrls: ['./viwe-compeny-details.component.css']
})
export class ViweCompenyDetailsComponent implements OnInit {

   compenyList: any[] = [];
      selectedCompeny: any = null;
   
     constructor(private compenyService:CompenyService,
                 private cdr: ChangeDetectorRef
     ) {}
  
 ngOnInit(): void {
  console.log("11111111111111111111111111155555551") 
    this.loadCompeny();
  }

loadCompeny(): void {
  this.compenyService.getCompeny().subscribe({
    next: (response: any) => {
      if (
        response &&
        response.status &&
        Array.isArray(response.payload) &&
        Array.isArray(response.payload[0])
      ) {
        this.compenyList = response.payload[0]; // ✅ Correct usage for nested array
        console.log("✅ Companies loaded:", this.compenyList);
      } else {
        console.warn("⚠️ Unexpected format or no data:", response);
      }
    },
    error: (err: any) => {
      console.error("❌ Error fetching companies:", err.message || err);
    }
  });
}



  deleteCompeny(id: string): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.compenyService.deleteCompeny(id).subscribe({
        next: (response: any) => {
          if (response.status) {
            alert("✅ Event deleted successfully.");
            this.loadCompeny(); // Refresh the list
          } else {
            alert("⚠️ Failed to delete event: " + response.message);
          }
        },
        error: (err: any) => {
          console.error("❌ Error deleting event:", err.message || err);
          alert("❌ Error deleting event.");
        }
      });
    }
  }

   editCompeny(company: any): void {
    console.log("📤 .....................", this.selectedCompeny);
   

     console.log("📝 Editing event:", company);
    this.selectedCompeny = { ...company };

      this.cdr.detectChanges(); 
  }

  updateCompeny(): void {

    console.log("🔁 Submitting update:", this.selectedCompeny); 
    if (this.selectedCompeny && this.selectedCompeny.id) {
      this.compenyService.updateCompeny(this.selectedCompeny.id, this.selectedCompeny).subscribe({
        next: (response: any) => {
          if (response.status) {
            alert('✅ Event updated successfully.');
            this.selectedCompeny = null;
            this.loadCompeny();
          } else {
            alert('⚠️ Failed to update event: ' + response.message);
          }
        },
        error: (err) => {
          console.error("❌ Error updating event:", err);
          alert("❌ Error updating event.");
        }
      });
    }else{
      console.log("error")
    }
}
}
