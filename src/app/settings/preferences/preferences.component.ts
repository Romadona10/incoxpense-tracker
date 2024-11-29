import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSettingsService } from 'src/app/services/usersettings.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  preferencesForm: FormGroup;
  userId:string = '';
  currencies = ['$', '€', '£', '¥', '₦'];
  reminderOptions = [
    { value: 'frequently', viewValue: 'Frequently' },
    { value: 'daily', viewValue: 'Daily' },
    { value: 'weekly', viewValue: 'Weekly' },
    { value: 'monthly', viewValue: 'Monthly' }
  ];
  saving = false;  // Progress bar control

  constructor(
    private fb: FormBuilder,
    private userSettingsService: UserSettingsService,
    private snackBar: MatSnackBar
  ) {
    this.preferencesForm = this.fb.group({
      currency: [''],
      notifications: [false],
      reminderFrequency: [''],
      monthlyBudget: [0],    
      annualBudget: [0]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.loadUserSettings();
  }

  loadUserSettings(): void {
    this.userSettingsService.getUserSettings(this.userId).subscribe((settings) => {
      if (settings) {
        this.preferencesForm.patchValue(settings);
      }
    });
  }

  onSavePreferences(): void {
    this.saving = true;  // Show progress bar
    const preferences = this.preferencesForm.value;

    setTimeout(() => {
      this.userSettingsService.updateUserSettings(this.userId, preferences).subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('Preferences saved successfully!', 'Close', { duration: 3000 });
          this.userSettingsService.notifySettingsUpdated(preferences);
        },
        error: () => {
          this.saving = false;
          this.snackBar.open('Failed to save preferences.', 'Close', { duration: 3000 });
        }
      });
    }, 4000);
  }
}