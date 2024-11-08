import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { MonthlySummaryComponent } from './monthly-summary/monthly-summary.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard-ui', component: DashboardUiComponent },
      {path: 'monthly-summary',component:MonthlySummaryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
