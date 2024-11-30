import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserSettings {
  userId: string;
  currency: string;
  notifications: boolean;
  reminderFrequency: string;
  monthlyBudget: number;   // New field for monthly budget
  annualBudget: number;    // New field for annual budget
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private apiUrl = 'https://expensetracker-backend-1-hdf2.onrender.com/api/user-settings';
 

  private settingsUpdated = new BehaviorSubject<any>(null); // Subject to notify changes
  settingsUpdated$ = this.settingsUpdated.asObservable();

  constructor(private http: HttpClient) {}

  getUserSettings(userId: string): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.apiUrl}/${userId}`);
  }

  updateUserSettings(userId: string, settings: Partial<UserSettings>): Observable<UserSettings> {
    return this.http.put<UserSettings>(`${this.apiUrl}/${userId}`, settings);
  }

  notifySettingsUpdated(settings: any): void {
    this.settingsUpdated.next(settings); // Notify other components of changes
  }
}