import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { EditProfileDialogComponent } from './dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './admin/admin.component';
import { HelpComponent } from './settings/help/help.component';
import { LoadingmodalComponent } from './dialogs/loadingmodal/loadingmodal.component';
import { ExportModalComponent } from './dialogs/export-modal/export-modal.component';
import { NotificationsComponent } from './dialogs/notifications/notifications.component';
import { NoDataModalComponent } from './dialogs/no-data-modal/no-data-modal.component';
import { EmailownerComponent } from './dialogs/emailowner/emailowner.component';
import { SavingsNotificationsComponent } from './dialogs/savings-notifications/savings-notifications.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';

import { HomeComponent } from './home/home.component';
import { ForgotPasswordModalComponent } from './dialogs/forgot-password-modal/forgot-password-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    EditProfileDialogComponent,
    AdminComponent,
    LoadingmodalComponent,
    ExportModalComponent,
    NotificationsComponent,
    NoDataModalComponent,
    EmailownerComponent,
    SavingsNotificationsComponent,
    NumberFormatPipe,
    HomeComponent,
    ForgotPasswordModalComponent,
    // SavingsFormComponent,
    // IncomeformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
   MatProgressSpinnerModule,
    MatCardModule,
    NgChartsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }

//  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }