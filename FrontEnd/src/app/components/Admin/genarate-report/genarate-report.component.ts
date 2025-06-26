

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { TDocumentDefinitions } from 'pdfmake/interfaces'; // ✅ better import
import { EventService } from 'src/app/services/event.service';

(pdfMake as any).vfs = pdfFonts.vfs;

@Component({
  selector: 'app-genarate-report',
  templateUrl: './genarate-report.component.html',
  styleUrls: ['./genarate-report.component.css']
})
export class GenarateReportComponent implements OnInit {

   constructor(private eventService: EventService, ) {}

  @ViewChild('reportChart') chartCanvas!: ElementRef;

  selectedType: string = 'applications';
  startDate: string = '';
  endDate: string = '';
  reportData: any = {
    totalApplications: 156,
    activeUsers: 842,
    totalEvents: 24
  };
  

  ngOnInit() {
    this.setDateRange('month');
    this.generateReport();

  }

  selectReportType(type: string) {
    this.selectedType = type;
    this.generateReport();
  }

  setDateRange(range: string) {
    const today = new Date();
    switch (range) {
      case 'today':
        this.startDate = today.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        this.startDate = weekAgo.toISOString().split('T')[0];
        this.endDate = new Date().toISOString().split('T')[0];
        break;
      case 'month':
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        this.startDate = monthAgo.toISOString().split('T')[0];
        this.endDate = new Date().toISOString().split('T')[0];
        break;
    }
    this.generateReport();
  }

  generateReport() {
    console.log('Generating report...', {
      type: this.selectedType,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  exportReport(format: string) {
    console.log(`Exporting as ${format}...`);
  }

  printReport() {
    window.print();
  }

 generatePDF() {
  this.eventService.getEvents().subscribe({
    next: (response: any) => {
      console.log('📦 Events response:', response);

      if (response && response.status && Array.isArray(response.payload)) {
        const events = response.payload[0];  // Adjusted for your data structure

        const eventTableBody = [
          ['Jobs title ', 'Date', 'Location']  // Table header
        ];

        events.forEach((event: any) => {
          eventTableBody.push([
            event.title || 'N/A',
            event.date || 'N/A',
            event.location || 'N/A'
          ]);
        });

        const documentDefinition: import('pdfmake/interfaces').TDocumentDefinitions = {
          content: [
            { text: 'Job Report', style: 'header' },
            { text: 'Generated on: ' + new Date().toLocaleString(), style: 'subheader' },
            { text: ' ' },
            { text: 'Totle Jobs Details', style: 'sectionHeader' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: eventTableBody
              }
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true
            },
            subheader: {
              fontSize: 12,
              italics: true
            },
            sectionHeader: {
              fontSize: 14,
              bold: true,
              margin: [0, 10, 0, 5]
            }
          }
        };

        pdfMake.createPdf(documentDefinition).download('job-report.pdf');
      } else {
        console.warn("⚠️ Invalid response format or empty event data.");
      }
    },
    error: err => {
      console.error("❌ Error generating PDF:", err.message || err);
    }
  });
}



}

