import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notificationsettings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: { message: string; timestamp: Date }[] = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.notifications = [
      { message: 'You have spent $50 today!', timestamp: new Date() },
      { message: 'Reminder: Monthly budget is due', timestamp: new Date() }
    ];
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.notificationService.startNotifications(userId); // Ensure notifications are started
    }

    this.notificationService.notifications$.subscribe(notifications => {
      console.log('Notifications updated:', notifications); // Log to debug
      this.notifications = notifications;
    });
  }
}
