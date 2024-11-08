import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    children: [
      { path: '', component: ExpensesListComponent }, // Default to Dashboard
      { path: 'Expenses-list', component: ExpensesListComponent },
      { path: 'add-expenses', component: AddExpenseComponent } ,// Monthly Summary route
      { path: 'edit-expenses', component: EditExpenseComponent } // Monthly Summary route

    ]
  }
];


@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,
    AddExpenseComponent,
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule, 
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,

    RouterModule.forChild(routes),
  ]
})
export class ExpensesModule { }
