import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savings-notifications',
  templateUrl: './savings-notifications.component.html',
  styleUrls: ['./savings-notifications.component.scss']
})
export class SavingsNotificationsComponent {

  constructor(private router:Router){

  }


  navigateIncome(){
    this.router.navigate(['dashboard/dashboard-ui'])
  }

}