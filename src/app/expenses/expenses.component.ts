import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.router.navigate(['/expenses/expenses-list']);
  }

  // This method can be triggered when a tab is clicked
  onTabChange(tabIndex: number) {
    switch(tabIndex) {
      case 0:
        this.router.navigate(['expenses/expenses-list']);
        break;
      case 1:
        this.router.navigate(['expenses/add-expenses']);
        break;
      case 2:
        this.router.navigate(['expenses/edit-expenses']);
        break;
    }
  }

}
