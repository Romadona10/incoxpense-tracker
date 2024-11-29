import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeComponent } from './income.component';
import { SavingsComponent } from './savings/savings.component';
import { IncomeUiComponent } from './income-ui/income-ui.component';

const routes: Routes = [
  { path: '', component: IncomeComponent,
    children: [
      { path: '', redirectTo: 'income-ui', pathMatch: 'full' },

      { path: 'income-ui', component: IncomeUiComponent },
      {path: 'savings',component:SavingsComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }