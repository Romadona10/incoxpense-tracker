import {
  Component,
  Renderer2,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notificationsettings.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ExpenseService } from './services/expense.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Fintracker';
  isDarkTheme: boolean = false;
  userName: string = '';
  userId: string = '';
  userPicture: string = '';
  showNotifications = false;
  notificationsCount = 0;
  click:string='Click'
  notifications: { message: string; timestamp: Date }[] = [];
  isMobile: boolean = false;
  isSidenavOpened: boolean = true;
  showLogoutWarning: boolean = false;
  logoutCountdown: number = 0;
  countdownInterval: any;
  backgroundImageUrl = `url('/assets/app-logo.png')`;


  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(
    private renderer: Renderer2,
    private notificationService: NotificationService,
    private expenseService: ExpenseService,
    public authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.checkIfMobile();

    // Load user profile picture if available
    this.userPicture = localStorage.getItem('userProfilePicture') || '';
    this.userName = localStorage.getItem('userName') || '';

    // Only update profile from localStorage if not already set
    if (!this.userName || !this.userPicture) {
        this.authService.userProfile$.subscribe((profile) => {
            if (profile) {
                this.userName = profile.fullName || '';
                this.userPicture = `https://expensetracker-backend-1-hdf2.onrender.com/uploads/${profile.picture}`;

                // Only store to localStorage if they were not already set
                if (!localStorage.getItem('userName')) {
                    localStorage.setItem('userName', this.userName);
                }
                if (!localStorage.getItem('userProfilePicture')) {
                    localStorage.setItem('userProfilePicture', this.userPicture);
                }

                // Start listening to notifications for this user
                this.notificationService.startNotifications(profile.userId);
            } else {
                this.userName = '';
                this.userPicture = '';
                localStorage.removeItem('userProfilePicture');
            }
        });
    }

    // Update notifications count when notifications change
    this.notificationService.notifications$.subscribe((notifications) => {
        this.notifications = notifications;
        this.notificationsCount = notifications.length;
        this.cdRef.detectChanges();
    });

    // Redirect to login if not authenticated
    if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
    }

    // Token expiration watcher
    this.startTokenExpirationWatcher();

    // Subscribe to expense changes to trigger notifications
    this.expenseService.expenseAdded$.subscribe((newExpense) => {
        if (newExpense) {
            const newNotification = {
                message: `New expense added: $${newExpense.amount} on ${newExpense.category}.`,
                timestamp: new Date(),
            };
            this.notifications.unshift(newNotification); // Add to notification list
            this.notificationsCount++; // Increment notification count
            this.cdRef.detectChanges();
        }
    });
}


  startTokenExpirationWatcher(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration > 0) {
          // Show a warning 3 minutes before expiration
          const warningTime = timeUntilExpiration - 3 * 60 * 1000; // 3 minutes in milliseconds

          if (warningTime > 0) {
            setTimeout(() => {
              this.showLogoutWarning = true;
              this.logoutCountdown = 180; // 3 minutes in seconds
              this.startLogoutCountdown();
            }, warningTime);
          }

          // Automatically log out after the token expires
          setTimeout(() => {
            this.logout();
          }, timeUntilExpiration);
        } else {
          // Token already expired
          this.logout();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.logout();
      }
    }
  }

  startLogoutCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.logoutCountdown > 0) {
        this.logoutCountdown--;
        this.cdRef.detectChanges();
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('userProfilePicture');
    clearInterval(this.countdownInterval); // Clear countdown if active
    this.router.navigate(['/auth/login']).then(() => {
      console.log('Navigated to login');
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.cdRef.detectChanges();
  }

  toggleSidenav(): void {
    if (this.isMobile && this.sidenav) {
      this.sidenav.toggle();
    }
  }
}