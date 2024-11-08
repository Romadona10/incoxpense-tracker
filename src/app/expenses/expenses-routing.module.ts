import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

const routes: Routes = [
  { path: '', component: ExpensesComponent,
    children: [
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },

      { path: 'expenses-list', component: ExpensesListComponent },
      {path: 'add-expenses',component:AddExpenseComponent},
      {path: 'edit-expenses',component:EditExpenseComponent},

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
