import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  isLoading = false; // Loading state for progress bar

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.isLoading = true; // Show progress bar
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        () => {
          this.isLoading = false; // Hide progress bar
          this.snackbar.open('Category added successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/categories/categories-lists']); // Redirect to category list
        },
        (error) => {
          this.isLoading = false; // Hide progress bar
          console.error('Error adding category:', error);
          this.snackbar.open('Error adding category', 'Close', { duration: 3000 });
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
