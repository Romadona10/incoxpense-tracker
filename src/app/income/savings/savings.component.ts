import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SavingsFormComponent } from 'src/app/dialogs/savings-form/savings-form.component';
import { SavingsNotificationsComponent } from 'src/app/dialogs/savings-notifications/savings-notifications.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
 
  isSavingsFormOpen: boolean = false;

  // Sample data for the savings goals
  savingsData = [
    { title: 'Vacation Fund', amount: 3000, goal: 5000, progress: 60, description: 'Saving for a vacation' },
    { title: 'Emergency Fund', amount: 2000, goal: 10000, progress: 20, description: 'Building an emergency fund' },
    { title: 'Car Fund', amount: 1000, goal: 7000, progress: 15, description: 'Saving for a new car' },
    { title: 'Car Fund', amount: 1000, goal: 7000, progress: 15, description: 'Saving for a new car' },
    { title: 'Car Fund', amount: 1000, goal: 7000, progress: 15, description: 'Saving for a new car' },
    { title: 'Car Fund', amount: 1000, goal: 7000, progress: 15, description: 'Saving for a new car' }



  ];

  // Selected currency, could be from user settings
  selectedCurrency: string = 'USD';

  constructor(private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openSavingsDialog();
  }

  // Function to simulate adding savings goals
  addSavings(): void {
    this.dialog.open(SavingsFormComponent, {
      width: '400px',
      data: {}  // Optionally pass data here if needed
    });
  }
  closeSavingsForm(): void {
    this.isSavingsFormOpen = false;
  }

  openSavingsDialog() {
    this.dialog.open(SavingsNotificationsComponent, {
      width: '800px',
      disableClose: true, // Prevent closing the dialog by clicking outside
       panelClass: 'savings-dialog'
    });
  }
}