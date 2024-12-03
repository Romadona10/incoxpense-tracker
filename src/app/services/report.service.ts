// report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://expensetracker-backend-1-hdf2.onrender.com/api/expenses/report/monthly';

  constructor(private http: HttpClient) {}

  getMonthlyReport(userId: string, month: number, year: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    return this.http.get<any>(`${this.apiUrl}/${userId}?month=${month}&year=${year}`, { headers });
  }
}
