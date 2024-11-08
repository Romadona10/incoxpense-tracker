import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingmodalComponent } from 'src/app/dialogs/loadingmodal/loadingmodal.component';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  isCustomCategory: boolean = false;
  categories: string[] = ['Groceries', 'Rent','Religious-giving', 'Utilities', 'Transportation', 'Entertainment', 'Food', 'Electronics',
     'Clothing', 'Health', 'Insurance', 'Wardrobe', 'Baby', 'Subscription', 'Beauty', 'Bills', 'Sports'];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.expenseForm = this.fb.group({
      date: [new Date(), Validators.required],
      category: ['', Validators.required],
      customCategory: [''],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      // Open loading modal
      const dialogRef = this.dialog.open(LoadingmodalComponent);

      const newExpense = {
        ...this.expenseForm.value,
        userId: localStorage.getItem('userId')
      };

      // Simulate a delay of 5 seconds
      setTimeout(() => {
        this.expenseService.addExpense(newExpense).subscribe({
          next: (response) => {
            console.log('Expense added successfully:', response);
            dialogRef.close(); // Close loading modal after request completes
            this.snackBar.open('Expense added successfully!', 'Close', {
              duration: 3000
            });
            this.resetForm();
          },
          error: (error) => {
            dialogRef.close(); // Close loading modal on error
            console.error('Error adding expense:', error);
          }
        });
      }, 5000); // 5 seconds delay
    }
  }

  resetForm(): void {
    this.expenseForm.reset({
      date: new Date(),
      category: '',
      customCategory: '',
      description: '',
      amount: ''
    });
    this.isCustomCategory = false;
  }

  toggleCustomCategory(): void {
    this.isCustomCategory = !this.isCustomCategory;
    if (this.isCustomCategory) {
      this.expenseForm.get('category')?.clearValidators();
    } else {
      this.expenseForm.get('customCategory')?.setValue('');
      this.expenseForm.get('category')?.setValidators(Validators.required);
    }
    this.expenseForm.get('category')?.updateValueAndValidity();
    this.expenseForm.get('customCategory')?.updateValueAndValidity();
  }
}
