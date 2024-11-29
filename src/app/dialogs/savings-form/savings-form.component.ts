import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-savings-form',
  templateUrl: './savings-form.component.html',
  styleUrls: ['./savings-form.component.scss']
})
export class SavingsFormComponent {

  // Output event to close the dialog
  @Output() closeForm = new EventEmitter<void>();

  // Form group for savings form
  savingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize form with form controls and validators
    this.savingsForm = this.fb.group({
      title: ['', Validators.required],
      goal: [null, [Validators.required, Validators.min(1)]],
      amount: [0, [Validators.min(0)]],
      description: ['']
    });
  }

  // Method to emit close event without saving
  onCancel(): void {
    this.closeForm.emit();
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.savingsForm.valid) {
      const savingsData = this.savingsForm.value;
      console.log('New Savings Goal:', savingsData);  // Replace with service call to save data
      this.closeForm.emit();  // Close the dialog after saving
    }
  }
}