import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailownerComponent } from 'src/app/dialogs/emailowner/emailowner.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  constructor(private router: Router,private dialog: MatDialog) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  reachOwner() {
    this.dialog.open(EmailownerComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
