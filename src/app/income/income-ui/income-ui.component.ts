import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeformComponent } from 'src/app/dialogs/incomeform/incomeform.component';
import { IncomeService } from 'src/app/services/income.service';
import { UserSettingsService } from 'src/app/services/usersettings.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income-ui.component.html',
  styleUrls: ['./income-ui.component.scss']
})
export class IncomeUiComponent implements OnInit {
  incomeForm: FormGroup;
  incomes: any[] = [];
  isLoading: boolean = false;
  userId: string = '';
  displayedColumns: string[] = ['date', 'amount', 'description'];
  dataSource = new MatTableDataSource<any>([]);
  isFormVisible: boolean = false;
  currencySymbol: string = '₦';
  totalIncome: number = 0;
  
  selectedMonth = new FormControl(new Date().getMonth() + 1); // Default to current month
  selectedYear = new FormControl(new Date().getFullYear());   // Default to current year
  
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private snackBar: MatSnackBar,
    private userSettingsService: UserSettingsService,
    private dialog: MatDialog
  ) {
    this.incomeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      description: [''],
      type: ['monthly', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchMonthlyIncome();
    this.loadUserCurrency();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  fetchMonthlyIncome(): void {
    const year = this.selectedYear.value ?? new Date().getFullYear(); 
    const month = this.selectedMonth.value ?? (new Date().getMonth() + 1);
    this.isLoading = true;
    setTimeout(() => {
    this.incomeService.getIncome(this.userId, year, month).subscribe(
      (response: any[]) => {
        this.incomes = response || [];
        this.dataSource.data = this.incomes;
        this.totalIncome = this.calculateTotalIncome();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching income data:', error);
        this.snackBar.open('Failed to load income data', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    ); 
  }, 4000);
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const { amount, date, description, type } = this.incomeForm.value;
      this.isLoading = true;

      this.incomeService.postIncome(this.userId, amount, date, description, type).subscribe(
        () => {
          this.snackBar.open('Income added successfully!', 'Close', { duration: 3000 });
          this.incomeForm.reset();
          this.fetchMonthlyIncome();
          this.isFormVisible = false;
        },
        (error) => {
          console.error('Error adding income:', error);
          this.snackBar.open('Failed to add income', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      );
    }
  }

  onMonthChange(): void {
    this.fetchMonthlyIncome();
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  openIncomeFormDialog(): void {
    const dialogRef = this.dialog.open(IncomeformComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMonthlyIncome();
      }
    });
  }

  calculateTotalIncome(): number {
    return this.incomes.reduce((total, income) => total + income.amount, 0);
  }

  loadUserCurrency(): void {
    this.userSettingsService.getUserSettings(this.userId).subscribe(settings => {
      if (settings && settings.currency) {
        this.currencySymbol = settings.currency;
      }
    });
  }
}