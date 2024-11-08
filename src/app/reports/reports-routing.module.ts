import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { ExportReportComponent } from './export-report/export-report.component';

const routes: Routes = [
  { path: '', component: ReportsComponent,
    children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },

      { path: 'monthly-reports', component: MonthlyReportComponent },
      {path: 'export-reports',component:ExportReportComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
export { RouterModule, Routes };

