import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HelpComponent } from './help/help.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    SettingsComponent,
    PreferencesComponent,
    ThemeSwitcherComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class SettingsModule { }
