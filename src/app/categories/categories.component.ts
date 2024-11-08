import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private router:Router){

  }

  ngOnInit(): void {
    // Navigate to the default dashboard content when the component loads
    this.router.navigate(['/categories/categories-lists']);
  }

  onTabChange(tabIndex: number) {
    switch(tabIndex) {
      case 0:
        this.router.navigate(['categories/categories-lists']);
        break;
      case 1:
        this.router.navigate(['categories/add-category']);
        break;
        case 2:
          this.router.navigate(['categories/edit-category']);
          break;
    }
  }
}
