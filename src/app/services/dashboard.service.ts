import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:5000/api/expenses';

  constructor(private http: HttpClient) { }

  getAnnualExpenses(userId: string, year: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    
    return this.http.get<any>(`${this.apiUrl}/annual-expenses/${userId}?year=${year}`, { headers });
  }
  
  // getMonthlyExpenses(userId: string, month: number, year: number): Observable<any> {

  //   const token = localStorage.getItem('token'); 
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);

  //   return this.http.get<any>(`${this.apiUrl}/monthly/${userId}?month=${month}&year=${year}`, { headers });
  // }
  
  getMonthlyExpenses(userId: string, month: number, year: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    return this.http.get<any>(`${this.apiUrl}/monthly/${userId}?month=${month}&year=${year}`, { headers });
  }
  
}
