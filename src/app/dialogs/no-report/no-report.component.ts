import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-no-report',
  templateUrl: './no-report.component.html',
  styleUrls: ['./no-report.component.scss']
})
export class NoReportComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedMonth: string }) {}

}
