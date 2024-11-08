import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Expense {
  userId: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:5000/api/expenses'; 


  constructor(private http: HttpClient) { }

  // addExpense(userId: string, expenseData: Expense): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.post(`${this.apiUrl}/add/${userId}`, expenseData, { headers });
  // }

  // getExpensesByDuration(userId: string, duration: string): Observable<Expense[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.get<Expense[]>(`${this.apiUrl}/by-duration/${userId}/${duration}`, { headers });
  // }

  addExpense(expenseData: Expense): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/add`, expenseData, { headers });
  }

  getExpensesByDuration(userId: string, duration: string): Observable<Expense[]> {
    const url = `${this.apiUrl}/${userId}/${duration}`;
    return this.http.get<Expense[]>(url);
  }
  
  getExpensesByMonth(userId: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/monthly/${userId}`, { headers });
  }

  // getExpensesByMonth(userId: string): Observable<any[]> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any[]>(`http://localhost:5000/api/expenses/monthly/${userId}`, { headers });
  // }


  
 
  
}
