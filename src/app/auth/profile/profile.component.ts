import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from 'src/app/dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: { userName: string; email: string; profileImage: string | null } = { 
    userName: '', 
    email: '', 
    profileImage: null 
  };
  
  
  

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  
  fetchUserProfile() {
    this.authService.getProfile().subscribe(
      (response) => {
        this.user.userName = response.fullName;
        this.user.email = response.email;
        this.user.profileImage = `http://localhost:5000/uploads/${response.profileImage}`; // profileImage now includes 'uploads/'
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { name: this.user.userName, email: this.user.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update user profile with the result from the dialog
        this.user.userName = result.userName;
        this.user.email = result.email;
      }
    });
  }
}
