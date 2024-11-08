import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { LoadingmodalComponent } from 'src/app/dialogs/loadingmodal/loadingmodal.component';
import { MatDialog } from '@angular/material/dialog';


interface Expense {
  date: Date;
  category: string;
  description: string;
  amount: number;
}

interface ExpensesByMonth {
  name: string;
  total: number;
  expenses: Expense[];
}
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expensesByMonth: any[] = [];
  loading = false;
  userId:string=''

   
    constructor(private expenseService: ExpenseService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.loading = true;
    this.userId = localStorage.getItem('userId') || ''; // Ensure userId is stored in localStorage
    this.expenseService.getExpensesByMonth(this.userId).subscribe({
      next: (data) => {
        this.expensesByMonth = Array.isArray(data) ? data : []; // Handle response as array
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching monthly expenses:', err);
        this.loading = false;
      }
    });
  }

  refresh(): void {
    const dialogRef = this.dialog.open(LoadingmodalComponent);

    this.fetchExpenses();


    dialogRef.afterOpened().subscribe(() => {
      
      setTimeout(() => {
        dialogRef.close();
      }, 4000); 
    });
  }
  
  
}
