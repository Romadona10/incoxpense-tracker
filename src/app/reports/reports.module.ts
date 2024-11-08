import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule,Routes} from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { ExportReportComponent } from './export-report/export-report.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ReportsComponent,
    MonthlyReportComponent,
    ExportReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    

    NgChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
