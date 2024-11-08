import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSettingsService } from './usersettings.service';
import { ExpenseService } from './expense.service';

interface Notification {
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  private notificationInterval: any;

  constructor(
    private userSettingsService: UserSettingsService,
    private expenseService: ExpenseService
  ) {}

  startNotifications(userId: string): void {
    this.userSettingsService.getUserSettings(userId).subscribe(settings => {
      let interval: number = 24 * 60 * 60 * 1000; // Default to daily

      switch (settings.reminderFrequency) {
        case 'daily':
          interval = 24 * 60 * 60 * 1000;
          break;
        case 'weekly':
          interval = 7 * 24 * 60 * 60 * 1000;
          break;
        case 'monthly':
          interval = 30 * 24 * 60 * 60 * 1000;
          break;
      }

      // Clear any previous interval to avoid multiple intervals running
      if (this.notificationInterval) {
        clearInterval(this.notificationInterval);
      }

      this.notificationInterval = setInterval(() => {
        this.expenseService.getExpensesByDuration(userId, settings.reminderFrequency).subscribe(expenses => {
          const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const message = `Reminder: Your total expenses for the ${settings.reminderFrequency} are ${settings.currency} ${total}`;

          // Add the notification to the list
          this.addNotification({ message, timestamp: new Date() });
        });
      }, interval);
    });
  }

  private addNotification(notification: Notification): void {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([notification, ...currentNotifications]);
  }

  // Clear the interval when the service is destroyed
  ngOnDestroy(): void {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}
