import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

interface Expense {
  userId: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'https://expensetracker-backend-1-hdf2.onrender.com/api/expenses';

  // BehaviorSubject to track added expenses
  private expenseAddedSubject = new BehaviorSubject<Expense | null>(null);
  expenseAdded$ = this.expenseAddedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Add an expense and notify observers
  addExpense(expenseData: Expense): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.post(`${this.apiUrl}/add`, expenseData, { headers });
  }
  
  // addExpense(expenseData: Expense): Observable<any> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${localStorage.getItem('token')}`
  //   );
  //   const addExpenseRequest = this.http.post(`${this.apiUrl}/add`, expenseData, { headers });

   
  //   addExpenseRequest.subscribe((response: any) => {
  //     if (response && response.success) {
  //       this.expenseAddedSubject.next(expenseData); 
  //     }
  //   });

  //   return addExpenseRequest;
  // }

  // Get expenses for a specific duration
  getExpensesByDuration(userId: string, duration: string): Observable<Expense[]> {
    const url = `${this.apiUrl}/${userId}/${duration}`;
    return this.http.get<Expense[]>(url);
  }

  // Get expenses grouped by month
  getExpensesByMonth(userId: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/monthly/${userId}`, { headers });
  }
}