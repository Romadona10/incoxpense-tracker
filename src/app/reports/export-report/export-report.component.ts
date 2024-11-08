import { Component } from '@angular/core';
import { ReportService } from 'src/app/services/report.service'; 
import { ExportModalComponent } from 'src/app/dialogs/export-modal/export-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-export-report',
  templateUrl: './export-report.component.html',
  styleUrls: ['./export-report.component.scss']
})
export class ExportReportComponent {
  selectedFormat: string = 'pdf'; // Default to PDF

  constructor(private reportService: ReportService,private dialog: MatDialog) {}

  // exportReport() {
  //   if (this.selectedFormat === 'pdf') {
  //     this.reportService.exportReportAsPDF().subscribe(() => {
  //       console.log('Report exported as PDF');
  //     });
  //   } else if (this.selectedFormat === 'excel') {
  //     this.reportService.exportReportAsExcel().subscribe(() => {
  //       console.log('Report exported as Excel');
  //     });
  //   }
  // }

  onExport(): void {
    this.dialog.open(ExportModalComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
