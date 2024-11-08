import { Component, Renderer2, OnInit, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notificationsettings.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Fintracker';
  isDarkTheme: boolean = false;
  userName: string = '';
  userPicture: string = '';
  showNotifications = false;
  notificationsCount = 0;
  isMobile: boolean = false;  // Track if the device is mobile
  isSidenavOpened: boolean = true; // Control sidenav state on mobile

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;  // Access sidenav for toggling

  constructor(
    private renderer: Renderer2,
    private notificationService: NotificationService,
    public authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkIfMobile(); // Check if the user is on mobile device on init

    // Check if user picture is already in local storage
    this.userPicture = localStorage.getItem('userProfilePicture') || '';
    this.notificationService.notifications$.subscribe(notifications => {
      this.notificationsCount = notifications.length;
    });

    this.authService.userProfile$.subscribe(profile => {
      if (profile) {
        this.userName = profile.fullName;
        this.userPicture = `http://localhost:5000/uploads/${profile.picture}`;
        localStorage.setItem('userProfilePicture', this.userPicture);
      } else {
        this.userName = '';
        this.userPicture = '';
        localStorage.removeItem('userProfilePicture');
      }
    });
  }

  // Check if the device is mobile based on screen width
  @HostListener('window:resize', ['$event'])
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile && this.sidenav) {
      this.sidenav.close(); // Close sidenav on mobile view
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
    this.router.navigate(['/auth/login']);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    console.log('Notifications triggered', this.showNotifications);
    this.cdRef.detectChanges();
  }

  // Toggle sidenav visibility (for mobile)
  toggleSidenav(): void {
    if (this.isMobile && this.sidenav) {
      this.sidenav.toggle(); // Toggle sidenav for mobile screens
    }
  }
}
