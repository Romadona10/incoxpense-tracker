import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { PreferencesComponent } from './preferences/preferences.component';


const routes:Routes =[
  {path: '',component:SettingsComponent,
    children:[
      {path: '', redirectTo:'settings',pathMatch:'full'},
      {path:'preferences',component:PreferencesComponent}
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
