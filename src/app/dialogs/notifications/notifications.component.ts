import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: { message: string; timestamp: Date }[] = [];
  userId: string = '';

  constructor(private expenseService: ExpenseService,private authservice:AuthService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if (this.userId) {
      this.fetchNotifications();
    }
  }

  fetchNotifications(): void {
    const duration = 'frequently'; // Ensure you set 'frequently' here
    this.expenseService.getExpensesByDuration(this.userId, duration).subscribe(
      (response: any) => {
        // Check if response.notifications is an array
        if (Array.isArray(response.notifications)) {
          this.notifications = response.notifications;
        } else {
          console.error('Notifications are not in the expected format:', response.notifications);
        }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
  
 
}