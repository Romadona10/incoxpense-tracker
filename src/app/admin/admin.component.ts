import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'fullName', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>();
  isLoading: boolean = false;

  private deleteTimeout: any;
  private deletedUserId: string | null = null;
  private countdownValue: number = 10;
  private countdownInterval: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild to access the paginator
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>; // Template reference for the dialog

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsersLists();
  }

  getUsersLists() {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.getUsers().subscribe(
        (users: any[]) => {
          this.dataSource.data = users.map(user => ({
            ...user,
            picture: user.picture ? `http://localhost:5000/uploads/${user.picture}` : null
          }));
          this.dataSource.paginator = this.paginator; // Assign paginator after fetching data
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
        this.dataSource.data = this.dataSource.data.filter(user => user._id !== userId);
        console.log('User account deleted successfully');
        this.snackbar.open('User account deleted successfully', 'Close');
      },
      error => {
        console.error('Error deleting user:', error);
        this.snackbar.open('Error deleting user', 'Close');
      }
    );
  }

  toggleActivation(user: any) {
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
        user.isActive = previousState; // Revert state if an error occurs
      }
    );
  }

  openDeleteModal(userId: string) {
    this.dialog.open(this.deleteDialog, {
      data: userId
    });
    this.deletedUserId = userId;
  }

  startCountdown(userId: string) {
    this.countdownValue = 10;
    this.updateSnackbarMessage();

    this.countdownInterval = setInterval(() => {
      this.countdownValue--;

      if (this.countdownValue > 0) {
        this.updateSnackbarMessage();
      } else {
        clearInterval(this.countdownInterval);
        this.deleteUser(userId);
      }
    }, 1000);

    this.snackbar
      .open(`Deleting in ${this.countdownValue} seconds...`, 'Undo', {
        duration: 10000
      })
      .onAction()
      .subscribe(() => {
        clearInterval(this.countdownInterval);
        this.snackbar.open('Deletion canceled', 'Close', { duration: 3000 });
        this.deletedUserId = null;
      });
  }

  updateSnackbarMessage() {
    this.snackbar.dismiss();
    this.snackbar.open(`Deleting in ${this.countdownValue} seconds...`, 'Undo', {
      duration: (this.countdownValue + 1) * 1000 // Update dynamically
    }).onAction().subscribe(() => {
      clearInterval(this.countdownInterval);
      this.snackbar.open('Deletion canceled', 'Close', { duration: 3000 });
      this.deletedUserId = null;
    });
  }

}
