import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do/to-do.component';
import { CategoriesComponent } from './to-do/categories/categories.component';
import { TasksComponent } from './to-do/tasks/tasks.component';
import { StepsComponent } from './to-do/steps/steps.component';
import { NavBarComponent } from './to-do/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    ToDoComponent,
    CategoriesComponent,
    TasksComponent,
    StepsComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToDoComponent
  ]
})
export class ToDoModule { }
