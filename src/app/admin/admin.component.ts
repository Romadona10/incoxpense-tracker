import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  user = { name: '', email: '', picture: '' };
  isLoading: boolean = false;


  constructor(private http: HttpClient,private authService:AuthService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.getUsersLists();
   
  }

 
  getUsersLists() {
    this.isLoading = true;
    setTimeout(() => {
      
      this.authService.getUsers().subscribe(
        (users: any[]) => {
          this.users = users.map(user => ({
            ...user,
            picture: user.picture  ? `http://localhost:5000/uploads/${user.picture}`:null
          }));
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.snackbar.open('Error fetching users', 'Close');
        }
      ).add(() => {
        this.isLoading = false; 
      });
    }, 4000);
  }
  

  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe(
      response => {
        this.users = this.users.filter(user => user._id !== userId);
        console.log('User account deleted successfully');
        this.snackbar.open('User account deleted successfully', 'Close');
      },
      error => {
        console.error('Error deleting user:', error);
        this.snackbar.open('Error deleting user', 'Close');
      }
    );
  }
  

  deactivateUser(userId: string) {
    // Implement soft delete / deactivation
  }

  toggleActivation(user: any) {
    // Toggle the local value of isActive (optimistic UI update)
    const previousState = user.isActive;
    user.isActive = !user.isActive;
  
    this.authService.updateUserStatus(user._id, { isActive: user.isActive }).subscribe(
      (response) => {
        console.log(`User ${user.isActive ? 'activated' : 'deactivated'} successfully`);
        this.snackbar.open(`User ${user.isActive ? 'activated' : 'deactivated'} successfully`, 'Close');
      },
      (error) => {
        console.error('Error toggling user activation:', error);
        this.snackbar.open('Error toggling user activation', 'Close');
  
        // Revert to the previous state in case of an error
        user.isActive = previousState;
      }
    );
  }
  
  
  



}
