import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Navigate to the default dashboard content when the component loads
    this.router.navigate(['/income/income-ui']);
  }

  onTabChange(tabIndex: number): void {
    switch(tabIndex) {
      case 0:
        this.router.navigate(['income/income-ui']);
        break;
      case 1:
        this.router.navigate(['income/savings']);
        break;
    }
  }
}