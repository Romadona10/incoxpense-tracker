import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
    fullName: string;
    email: string;
    password: string;
    picture?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://expensetracker-backend-q5pq.onrender.com/api/auth';
    private token: string | null = null;
    private isAdmin: boolean = false;
    

    private userProfileSubject = new BehaviorSubject<any>(null);
    userProfile$ = this.userProfileSubject.asObservable();
    userPicture: string = '';

    constructor(private http: HttpClient) { }

    register(user: User, picture?: File): Observable<any> {
        const formData = new FormData();
        formData.append('fullName', user.fullName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        if (picture) {
            formData.append('picture', picture, picture.name);
        }

        return this.http.post(`${this.apiUrl}/register`, formData);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<{ token: string, isAdmin: boolean, userId: string ,picture:string}>(`${this.apiUrl}/login`, { email, password })
            .pipe(
                tap(response => {
                    this.token = response.token;
                    this.isAdmin = response.isAdmin;
    
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('isAdmin', response.isAdmin.toString());
                    localStorage.setItem('userId', response.userId);
                    // localStorage.setItem('userProfilePicture', this.userPicture);
                    localStorage.setItem('userProfilePicture', `https://expensetracker-backend-q5pq.onrender.com/uploads/${response.picture}`);
    
                    this.getProfile().subscribe(profile => this.userProfileSubject.next(profile));
                })
            );
    }

    getProfile(): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) return new Observable(); 
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.get(`${this.apiUrl}/profile`, { headers });
    }

    getUsers(): Observable<any[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            return new Observable();
        }
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.get<any[]>(`${this.apiUrl}/admin/users`, { headers });
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${userId}`);
    }

    updateUserStatus(userId: string, statusUpdate: { isActive: boolean }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update-status/${userId}`, statusUpdate);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getIsAdmin(): boolean {
        return localStorage.getItem('isAdmin') === 'true';
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout() {
        this.token = null;
        this.isAdmin = false;
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        this.userProfileSubject.next(null);
    }
}
