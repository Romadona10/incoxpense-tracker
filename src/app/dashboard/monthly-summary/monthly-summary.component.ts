import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserSettingsService } from 'src/app/services/usersettings.service';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NoDataModalComponent } from 'src/app/dialogs/no-data-modal/no-data-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss']
})
export class MonthlySummaryComponent implements OnInit {
  expenses: any[] = [];
  displayedColumns: string[] = ['date', 'category', 'description', 'amount'];
  dataSource = new MatTableDataSource<any>(this.expenses); 
  selectedMonth = new FormControl<string | null>(moment().format('MMMM')); // Month name selection
  selectedYear = new FormControl<number>(moment().year()); // Year selection
  userId: string = '';
  totalExpenses: number = 0;
  // currency: string = '₦';
  currencySymbol: string = '₦'; 
  monthlyBudget:number = 100000;
  loading: boolean = false;

  months: string[] = moment.months(); // Array of month names

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private userSettingsService: UserSettingsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.loadUserCurrency();
    this.loadUserSettings()

    // Get the initial month and year
    const monthIndex = moment().month(this.selectedMonth.value || 'January').month() + 1;
    const year = this.selectedYear.value || moment().year();
    this.loadMonthlyExpenses(monthIndex, year);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUserCurrency(): void {
    this.userSettingsService.getUserSettings(this.userId).subscribe(settings => {
      if (settings && settings.currency) {
        this.currencySymbol = settings.currency;
      }
    });
  }

  // loadMonthlyExpenses(month: number, year: number): void {
  //   this.loading = true;
  //   this.expenses = [];
  //   this.dataSource.data = [];

  //   this.dashboardService.getMonthlyExpenses(this.userId, month, year).subscribe(
  //     data => {
  //       this.loading = false;
  //       if (data && data.expenses && data.expenses.length > 0) {
  //         this.expenses = data.expenses;
  //         this.dataSource.data = this.expenses;
  //       } else {
  //         this.openNoDataModal();
  //       }
  //     },
  //     error => {
  //       console.error("Error loading monthly expenses:", error);
  //       this.loading = false;
  //     }
  //   );
  // }

  loadMonthlyExpenses(month: number, year: number): void {
    this.loading = true; 
    this.expenses = []; 
    this.dataSource.data = []; 

    setTimeout(() => {
      this.dashboardService.getMonthlyExpenses(this.userId, month, year).subscribe(
        data => {
          this.loading = false; 
          if (data && data.expenses && data.expenses.length > 0) {
            this.expenses = data.expenses;
            this.dataSource.data = this.expenses; 
            this.totalExpenses = this.getTotal();
          } else {
            this.openNoDataModal(); 
            this.totalExpenses = 0;
          }
        },
        error => {
          console.error("Error loading monthly expenses:", error);
          this.loading = false; 
        }
      );
    }, 4000);
  }


  onMonthChange(): void {
    const monthIndex = moment().month(this.selectedMonth.value || 'January').month() + 1;
    const year = this.selectedYear.value || moment().year();
    this.loadMonthlyExpenses(monthIndex, year);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotal(): number {
    return this.expenses.reduce((total, exp) => total + exp.amount, 0);
  }

  addNavigate() {
    this.router.navigate(['expenses/add-expenses']);
  }

  openNoDataModal(): void {
    this.dialog.open(NoDataModalComponent, {
      width: '400px',
      data: { message: 'No expenses found for the selected month.' }
    });
  }

  loadUserSettings() {
    this.userSettingsService.getUserSettings(this.userId).subscribe(settings => {
      if (settings) {
        if (settings.currency) this.currencySymbol = settings.currency;
        if (settings.monthlyBudget) this. monthlyBudget = settings.monthlyBudget;
      }
    });
  }
}