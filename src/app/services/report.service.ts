// report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:5000/api/expenses/report/monthly';

  constructor(private http: HttpClient) {}

  getMonthlyReport(userId: string, month: number, year: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    return this.http.get<any>(`${this.apiUrl}/${userId}?month=${month}&year=${year}`, { headers });
  }
}
