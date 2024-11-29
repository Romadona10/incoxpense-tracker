import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { SavingsComponent } from './savings/savings.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { IncomeUiComponent } from './income-ui/income-ui.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { IncomeformComponent } from '../dialogs/incomeform/incomeform.component';
import { SavingsFormComponent } from '../dialogs/savings-form/savings-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    IncomeComponent,
    SavingsComponent,
    IncomeUiComponent,
    IncomeformComponent,
    SavingsFormComponent
  ],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class IncomeModule { }