import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { HelpComponent } from './settings/help/help.component';
import { NotificationsComponent } from './dialogs/notifications/notifications.component';

const routes: Routes = [
  { path: 'dashboard',
     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
    },
  { path: 'expenses',
     loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule) 
    },
  { path: 'reports',
     loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
     },
  { path: 'categories',
     loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) 
    },
  { path: 'auth',
     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
    },
  { path: 'settings',
     loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
     },
     { path: 'admin', component: AdminComponent,canActivate: [AdminGuard] },
     { path: 'help', component: HelpComponent },
     { path: 'notifications', component: NotificationsComponent },

     { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
