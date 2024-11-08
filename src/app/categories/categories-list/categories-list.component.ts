import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private snackbar: MatSnackBar,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // Fetch categories from the service
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.snackbar.open('Error fetching categories', 'Close', { duration: 3000 });
      }
    );
  }

  // Navigate to add category page
  onAddCategory(): void {
    this.router.navigate(['/categories/add-category']);
  }

  // Navigate to edit category page
  onEditCategory(category: Category): void {
    this.router.navigate(['/categories/edit-category', category._id]);
  }

  // Delete a category
  onDeleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category._id).subscribe(
      () => {
        this.categories = this.categories.filter(cat => cat._id !== category._id);
        this.snackbar.open('Category deleted successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error deleting category:', error);
        this.snackbar.open('Error deleting category', 'Close', { duration: 3000 });
      }
    );
  }
}
