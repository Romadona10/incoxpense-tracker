// monthly-report.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartOptions: ChartOptions = { 
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ₦${tooltipItem.raw || 0}`
        }
      }
    }
  };
  chartType: ChartType = 'bar';
  selectedMonth: string = '';
  months: string[] = [
    'January', 'February', 'March', 'April', 'May','June',
    'July','August','September','October','November','December'
  ];
  totalAmount: number | null = null;
  chartData = {
    datasets: [
      {
        data: [], // Will be updated with API data
        label: 'Expenses',
        backgroundColor: [
          'rgb(254, 236, 55)', 
          'rgb(255, 162, 76)', 
          'rgb(255, 119, 183)',
          'rgb(9, 16, 87)',
         ' rgb(175, 23, 64)',
         'rgb(13, 146, 244)'
        ],
      }
    ],
    labels: []
  };
  userId: string = ''; // Fetch this from the AuthService

  constructor(private reportService: ReportService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.selectedMonth = this.months[0];
    const currentMonthIndex = new Date().getMonth();
    this.selectedMonth = this.months[currentMonthIndex];
    this.userId = localStorage.getItem('userId') || ''; 
    const currentYear = new Date().getFullYear();
    this.loadReportData(this.selectedMonth, currentYear);
  }

  loadReportData(month: string, year: number) {
    const monthIndex = this.months.indexOf(month) + 1; // Convert month name to month number (1-based)
    this.reportService.getMonthlyReport(this.userId, monthIndex, year).subscribe(report => {
      this.chartData.datasets[0].data = report.data; // Chart data
      this.chartData.labels = report.labels; // Category labels
      this.totalAmount = report.total; // Total expenses

      if (this.chart) {
        this.chart.update(); // Trigger chart re-render
      }
    });
  }

  onMonthChange(event: any) {
    const currentYear = new Date().getFullYear();
    this.loadReportData(event.value, currentYear);
  }
}
