import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { HelpComponent } from './settings/help/help.component';
import { NotificationsComponent } from './dialogs/notifications/notifications.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Home route as the first point of contact
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  // Lazy-loaded modules
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./expenses/expenses.module').then((m) => m.ExpensesModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'income',
    loadChildren: () =>
      import('./income/income.module').then((m) => m.IncomeModule),
  },

  // Admin route with guard
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },

  // Static component routes
  { path: 'help', component: HelpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'notifications', component: NotificationsComponent },

  // Fallback for undefined routes
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
