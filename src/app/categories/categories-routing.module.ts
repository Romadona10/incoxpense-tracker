import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


const routes: Routes = [
  { path: '', component: CategoriesComponent,
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },

      { path: 'categories-lists', component: CategoriesListComponent },
      {path: 'add-category',component:AddCategoryComponent},
      {path: 'edit-category/:id',component:EditCategoryComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
