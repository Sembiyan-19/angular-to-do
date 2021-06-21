import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  constructor(private toDoService : ToDoService) { }

  categoriesList = this.toDoService.categories;
  tasksList: any = null;
  categoryHeading = "";
  currentCategoryId = "";
  task: any = null;

  addNewCategory(newCategory: string) {
    this.currentCategoryId = this.toDoService.addnewCategory(newCategory);
    this.displayTasks(this.currentCategoryId);
  }

  displayTasks(categoryId: string) {
    this.currentCategoryId = categoryId;
    this.tasksList = this.toDoService.getTasks(categoryId);
    this.categoryHeading = this.toDoService.getTaskName(categoryId);
  }

  addNewTask(newTask: string) {
    this.toDoService.addTask(newTask);
  }

  addNewStep(newStep: string) {
    this.toDoService.addStep(newStep);
  }

  ngOnInit(): void {
    this.displayTasks("tasks");
  }

  markImportant(iconId: string) {
    this.toDoService.markImportant(iconId);
  }

  markComplete(iconId: string) {
    this.toDoService.markComplete(iconId);
  }

  displaySteps(taskId: string) {
    this.task = this.toDoService.getSteps(taskId);
  }
}
