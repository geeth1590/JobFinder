import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  

  onSubmit(){}
  contact = {
  name: '',
  email: '',
  message: ''
};

constructor(private http: HttpClient){}

submitContactForm() {
  this.http.post('http://localhost:8080/api/user/contact', this.contact).subscribe({
    next: () => {
      Swal.fire('✅ Sent!', 'We received your message.', 'success');
      this.contact = { name: '', email: '', message: '' }; // reset form
    },
    error: (err: { error: { message: any; }; }) => {
      Swal.fire('❌ Failed', err?.error?.message || 'Something went wrong.', 'error');
    }
  });
}

}
