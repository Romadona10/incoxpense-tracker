import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Retrieved categoryId:', this.categoryId); // Debugging log
    if (this.categoryId) {
      this.loadCategory();
    } else {
      console.error('Category ID is missing from the route');
      this.snackbar.open('Invalid category ID', 'Close', { duration: 3000 });
      this.router.navigate(['/categories']); // Redirect if categoryId is missing
    }
  }

  loadCategory(): void {
    this.isLoading = true;
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (category) => {
        this.isLoading = false;
        if (category) {
          // Patch the form if the category exists
          this.categoryForm.patchValue({
            name: category.name
          });
        } else {
          // Handle case where category is not found
          this.isLoading = false;
          console.error('Category not found');
          this.snackbar.open('Category not found', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Error loading category:', error);
        this.snackbar.open('Error loading category', 'Close', { duration: 3000 });
      }
    );
  }

  onUpdate(): void {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(
        () => {
          this.isLoading = false; 
          this.snackbar.open('Category updated successfully, check Lists', 'Close', { duration: 3000 });
          // this.router.navigate(['/categories-list']);
        },
        (error) => {
          this.isLoading = false; 
          console.error('Error updating category:', error);
          this.snackbar.open('Error updating category', 'Close', { duration: 3000 });
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
