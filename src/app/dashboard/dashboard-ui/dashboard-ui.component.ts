import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, StaticClassProvider } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserSettingsService } from 'src/app/services/usersettings.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Expense {
  date: Date;
  description: string;
  amount: number;
  category: string;
}

interface MonthlyExpense {
  month: number;
  total: number;
  transactions: number;
  details: Expense[];
}

@Component({
  selector: 'app-dashboard-ui',
  templateUrl: './dashboard-ui.component.html',
  styleUrls: ['./dashboard-ui.component.scss'],
  animations: [
    trigger('smoothExpand', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ])
  ]
})
export class DashboardUiComponent implements OnInit, AfterViewInit {
  annualExpenses: MonthlyExpense[] = [];
  userId: string = '';
  currentYear: number = new Date().getFullYear();
  loading: boolean = true;
  annualTotal: number = 0;
  showTransactions = false;
  currency: string = '₦';
  annualBudget:number = 10000
  // userBudget: number = 10000;

  totalExpenses: number = 0;
  remainingBudget: number = 0;
  topCategory: string = '';
  totalTransactions: number = 0;

  @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart<'bar', number[], string> | undefined;

  chartData = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#604CC3','#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF6500', '#1A1A19', '#31511E', '#F6FCDF', '#000B58',
          '#003161', '#006A67', '#FFF4B7','#FF6600','#F5F5F5','#8FD14F',],
      }
    ],
    labels: [] as string[]
  };

  recentExpenses: Expense[] = [];
  summaryCards = [
    { title: 'Total Expenses', value: this.totalExpenses },
    { title: 'Remaining Budget', value: this.remainingBudget },
    { title: 'Top Category', value: this.topCategory },
    { title: 'Total Transactions', value: this.totalTransactions }
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private userSettingsService: UserSettingsService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.loadUserSettings();
    this.fetchAnnualExpenses();
    this.userSettingsService.settingsUpdated$.subscribe(settings => {
      if (settings) {
        if (settings.currency) this.currency = settings.currency;
        if (settings.annualBudget) this.annualBudget = settings.annualBudget;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.chartData.datasets[0].data.length > 0) {
        this.initializeChart();
      }
    }, 1500);
  }

  initializeChart(): void {
    if (this.chart) return;

    const canvas = this.myChartRef?.nativeElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    this.chart = new Chart<'bar', number[], string>(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        }
      }
    });
    this.loading = false;
  }

  addNavigate() {
    this.router.navigate(['/expenses/add-expenses']);
  }

  fetchAnnualExpenses(): void {
    this.loading = true;
    this.dashboardService.getAnnualExpenses(this.userId, this.currentYear).subscribe(
      data => {
        if (data && Array.isArray(data.expenses)) {
          this.annualExpenses = data.expenses.map((expense: any) => ({
            month: expense.month,
            total: expense.total,
            transactions: expense.transactions,
            details: expense.details || []
          }));
          this.calculateOverview();
          this.updateSummaryCards();
          this.updateChartData();

          const allExpenses: Expense[] = [];
          this.annualExpenses.forEach(month => allExpenses.push(...month.details));

          this.recentExpenses = allExpenses
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);

          this.loading = false;
        } else {
          console.error('Invalid expenses data format:', data);
          this.loading = false;
        }
      },
      error => {
        console.error('Error fetching annual expenses:', error);
        this.loading = false;
      }
    );
  }

  calculateOverview(): void {
    this.totalExpenses = this.annualExpenses.reduce((sum, month) => sum + month.total, 0);
    this.totalTransactions = this.annualExpenses.reduce((sum, month) => sum + month.transactions, 0);
    this.remainingBudget = this.annualBudget - this.totalExpenses;
    this.topCategory = this.getTopCategory();
  }

  getTopCategory(): string {
    const categoryTotals = this.getCategoryTotals();
    let topCategory = '';
    let highestPercentage = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {
      const percentage = (amount / this.totalExpenses) * 100;
      if (percentage > highestPercentage) {
        highestPercentage = percentage;
        topCategory = `${category} (${highestPercentage.toFixed(2)}%)`;
      }
    });

    return topCategory || 'N/A';
  }

  getCategoryTotals(): { [category: string]: number } {
    const totals: { [category: string]: number } = {};
    this.annualExpenses.forEach(month =>
      month.details.forEach(expense => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      })
    );
    return totals;
  }

  updateSummaryCards(): void {
    this.summaryCards[0].value = this.totalExpenses;
    this.summaryCards[1].value = this.remainingBudget;
    this.summaryCards[2].value = this.topCategory;
    this.summaryCards[3].value = this.totalTransactions;
  }

  updateChartData(): void {
    const categoryTotals = this.getCategoryTotals();
    this.chartData.labels = Object.keys(categoryTotals);
    this.chartData.datasets[0].data = Object.values(categoryTotals);

    if (this.chart) {
      this.chart.update();
    }
  }

  loadUserSettings() {
    this.userSettingsService.getUserSettings(this.userId).subscribe(settings => {
      if (settings) {
        if (settings.currency) this.currency = settings.currency;
        if (settings.annualBudget) this.annualBudget = settings.annualBudget;
      }
    });
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  viewAllExpenses(): void {
    this.showTransactions = !this.showTransactions;
  }
}