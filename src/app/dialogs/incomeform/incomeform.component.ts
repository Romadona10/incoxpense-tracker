import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';

@Component({
  selector: 'app-incomeform',
  templateUrl: './incomeform.component.html',
  styleUrls: ['./incomeform.component.scss']
})
export class IncomeformComponent {

  @Output() closeForm = new EventEmitter<void>(); // Event emitter to close the form
  incomeForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    // Initialize form with validation rules
    this.incomeForm = this.fb.group({
      source: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      description: ['']
    });
  }

  
  
  // Method called on form submission
  onSubmit(): void {
    if (this.incomeForm.valid) {
      // Set isLoading to true when the form is valid and submission starts
      this.isLoading = true;
      
      const incomeData = this.incomeForm.value;
      console.log('Income Data Submitted:', incomeData);
  
      // Simulate a delay with setTimeout
      setTimeout(() => {
        // After 4 seconds, emit the closeForm event and set isLoading to false
        this.closeForm.emit();
        this.isLoading = false;  // Set isLoading to false after the operation is complete
      }, 4000);  // 4 seconds delay
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.closeForm.emit();
  }

  // onAmountKeyDown(event: KeyboardEvent): void {
  //   const inputElement = event.target as HTMLInputElement;

  //   // Get the raw value and remove commas
  //   let rawValue = inputElement.value.replace(/,/g, '');

  //   // Allow navigation and special keys
  //   const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
  //   if (allowedKeys.includes(event.key)) {
  //     return;
  //   }

  //   // Validate that only numeric input is allowed
  //   if (!/^\d$/.test(event.key)) {
  //     event.preventDefault();
  //     return;
  //   }

  //   // Append the pressed key
  //   rawValue += event.key;

  //   // Format the raw value with commas
  //   const formattedValue = Number(rawValue).toLocaleString();

  //   // Prevent cursor jump by updating asynchronously
  //   setTimeout(() => {
  //     inputElement.value = formattedValue;
  //     this.incomeForm.get('amount')?.setValue(rawValue, { emitEvent: false });
  //     console.log('Key pressed:', event.key);
  //     console.log('Form Control Value:', this.incomeForm.get('amount')?.value);

  //   });
  // }
  
  
  
  
}