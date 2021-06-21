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
  category: any = null;
  currentCategoryId = "";
  task: any = null;
  isDisplayingSteps = false;
  emptyList = new Array();

  /**
   * Adds a new category
   * @param newCategory     name of the category
   */
  addNewCategory(newCategory: string) {
    this.currentCategoryId = this.toDoService.addnewCategory(newCategory);
    this.displayTasks(this.currentCategoryId);
  }

  /**
   * Gets the category object
   * @param categoryId     id of the category
   */
  displayTasks(categoryId: string) {
    this.currentCategoryId = categoryId;
    let category: any = this.toDoService.getCategory(categoryId);
    this.category = category;
    let count = 9 - category.tasks.length;
    this.emptyList = Array(count);
    this.isDisplayingSteps = false;
  }

  /**
   * Adds a new task to a category
   * @param newTask     name of the task
   */
  addNewTask(newTask: string) {
    this.toDoService.addTask(newTask);
  }

  /**
   * Adds a new step to a task
   * @param newStep name of the step
   */
  addNewStep(newStep: string) {
    this.toDoService.addStep(newStep);
  }

  ngOnInit(): void {
    this.displayTasks("tasks");
  }

  /**
   * Marks a task important/unimportant
   * @param iconId     id of icon clicked
   */
  markImportant(iconId: string) {
    this.toDoService.markImportant(iconId);
  }

  /**
   * Marks a task complete/incomplete
   * @param iconId     id of icon clicked
   */
  markComplete(iconId: string) {
    this.toDoService.markComplete(iconId);
  }

  /**
   * Gets the task object
   * @param taskId    id of the task
   */
  displaySteps(taskId: string) {
    this.task = this.toDoService.getTask(taskId);
    this.isDisplayingSteps = true;
  }
}
