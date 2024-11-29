import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingmodalComponent } from 'src/app/dialogs/loadingmodal/loadingmodal.component';
import { ExpenseService } from 'src/app/services/expense.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  isCustomCategory: boolean = false;
  categories: string[] = []; // Dynamically fetched categories

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
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

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories.map((cat) => cat.name); // Extract category names
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Error fetching categories!', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const dialogRef = this.dialog.open(LoadingmodalComponent);

      const newExpense = {
        ...this.expenseForm.value,
        userId: localStorage.getItem('userId'),
        category: this.isCustomCategory
          ? this.expenseForm.value.customCategory
          : this.expenseForm.value.category,
      };

      this.expenseService.addExpense(newExpense).subscribe({
        next: (response) => {
          console.log('Expense added successfully:', response);

          // Add the custom category to the list if it's not already there
          if (this.isCustomCategory && !this.categories.includes(newExpense.category)) {
            this.categories.push(newExpense.category);
          }

          dialogRef.close();
          this.snackBar.open('Expense added successfully! click the notifications Icon', 'Close', {
            duration: 3000,
          });
          this.resetForm();
        },
        error: (error) => {
          dialogRef.close();
          console.error('Error adding expense:', error);
        },
      });
    }
  }

  resetForm(): void {
    this.expenseForm.reset({
      date: new Date(),
      category: '',
      customCategory: '',
      description: '',
      amount: '',
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

  onNavigate(){
    this.router.navigate(['dashboard/monthly-summary'])
  }
}