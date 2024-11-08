import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  constructor(private router:Router){

  }

  ngOnInit(): void {
    
    this.router.navigate(['/reports/monthly-reports']);
  }

  onTabChange(tabIndex: number) {
    switch(tabIndex) {
      case 0:
        this.router.navigate(['/reports/monthly-reports']);
        break;
      case 1:
        this.router.navigate(['/reports/export-reports']);
        break;
    }
  }

}
