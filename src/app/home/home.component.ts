import { Component, ViewChild, HostListener, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isMobile: boolean = false;
  isSidenavOpened: boolean = true;
  backgroundImageUrl = `url('/assets/growth-curve.jpg')`;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;


  constructor( public authService: AuthService,){}


  features = [
    { icon: 'track_changes', title: 'Track Expenses', description: 'Monitor your spending effortlessly.' },
    { icon: 'pie_chart', title: 'Analyze Budgets', description: 'Visualize your financial health.' },
    { icon: 'notifications', title: 'Get Alerts', description: 'Never miss an important update.' },
  ];

  testimonials = [
    { message: 'This app changed how I manage my finances!', user: 'Jane Doe' },
    { message: 'Simple, elegant, and effective.', user: 'John Smith' },
    { message: 'Highly recommend for tracking and budgeting.', user: 'Sarah Lee' },
    { message: 'Best financial tool I’ve used!', user: 'David Kim' },
    { message: 'A must-have for financial discipline.', user: 'Amy Brown' },
    { message: 'Love the simplicity and efficiency.', user: 'Mark Johnson' }
  ];

  images = [
    { url: 'assets/book-keeping.jpg', caption: 'Manage your finances seamlessly' },
    { url: 'assets/finance.jpg', caption: 'finance is key' },
    { url: 'assets/track.jpg', caption: 'Track every expense with ease' },
    { url: 'assets/groceries.jpg', caption: 'Manage your expenses seamlessly' },
    { url: 'assets/calculator.jpg', caption: 'Achieve your savings goals' },
    { url: 'assets/Ceo.jpg', caption: 'Boss every expense with ease' },
  ];

  transformTestimonials = 'translateX(0)';  // Default position of testimonials

  currentTestimonialIndex = 0;
  totalTestimonials = this.testimonials.length;

  ngOnInit(): void {
    // Testimonials carousel is still handled by JavaScript
    this.startTestimonialsCarousel();
  }

  startTestimonialsCarousel(): void {
    setInterval(() => {
      if (this.currentTestimonialIndex < this.totalTestimonials - 1) {
        this.currentTestimonialIndex++;
      } else {
        this.currentTestimonialIndex = 0;
      }
      this.transformTestimonials = `translateX(-${this.currentTestimonialIndex * 100}%)`;
    }, 3000); // Change testimonial every 3 seconds
  }

  toggleSidenav(): void {
    if (this.isMobile && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  @HostListener('window:resize', ['$event'])
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }
}
