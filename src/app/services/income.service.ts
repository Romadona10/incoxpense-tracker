import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  
  private apiUrl = 'https://expensetracker-backend-1-hdf2.onrender.com/api';

  constructor(private http: HttpClient) { }

  // Method to create authorization headers for secure API calls
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // POST method to add new income entry

// Add 'type' as an argument
postIncome(userId: string, amount: number, date: string, description: string, type: string): Observable<any> {
  const body = { userId, amount, date, description, type };
  const headers = this.getAuthHeaders();
  return this.http.post(`${this.apiUrl}/income/add`, body, { headers });
}


  // GET method to fetch income for a specific year and month
 // GET method to fetch income for a specific year and month
getIncome(userId: string, year: number, month: number): Observable<any> {
  const params = new HttpParams()
    .set('year', year.toString())
    .set('month', month.toString());
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.apiUrl}/income/monthly/${userId}`, { params, headers });
}


  // POST method to add new savings entry
  postSavings(amount: number, goal: string, date: string, description: string): Observable<any> {
    const body = { amount, goal, date, description };
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/savings`, body, { headers });
  }

  // GET method to fetch savings for a specific year and month
  getSavings(year: number, month: number): Observable<any> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/savings`, { params, headers });
  }
}