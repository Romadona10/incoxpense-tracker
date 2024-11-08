import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


interface Category {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `https://expensetracker-backend-q5pq.onrender.com/api/categories`;

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(error);
      })
    );
  }
  

  // Get a category by ID
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Add a new category
  addCategory(category: { name: string }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Update an existing category
  updateCategory(id: string, updatedCategory: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedCategory);
  }
  

  // Delete a category
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
