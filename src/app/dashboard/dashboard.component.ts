import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router){

  }

  ngOnInit(): void {
    // Navigate to the default dashboard content when the component loads
    this.router.navigate(['/dashboard/dashboard-ui']);
  }

  onTabChange(tabIndex: number) {
    switch(tabIndex) {
      case 0:
        this.router.navigate(['dashboard/dashboard-ui']);
        break;
      case 1:
        this.router.navigate(['dashboard/monthly-summary']);
        break;
    }
  }

}
