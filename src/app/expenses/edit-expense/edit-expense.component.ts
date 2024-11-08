import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  editForm!: FormGroup;
  categories: string[] = ['Groceries', 'Rent', 'Utilities', 'Transportation', 'Entertainment'];
  expenseId: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadExpense();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      date: [new Date(), Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadExpense(): void {
    // Mock data - you would typically load the expense by ID from a service
    const mockExpense = {
      date: new Date('2024-10-15'),
      category: 'Groceries',
      description: 'Weekly groceries',
      amount: 150
    };

    // Simulating the loading of the expense by ID
    if (this.expenseId) {
      this.editForm.patchValue(mockExpense);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedExpense = this.editForm.value;
      console.log('Expense updated:', updatedExpense);
      // Call a service to update the expense in the database
    }
  }
}

