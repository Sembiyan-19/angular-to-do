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
  tasksList = new Array();
  categoryHeading = "";

  addNewCategory(newCategory: string) {
    this.toDoService.addnewCategory(newCategory);
  }

  displayTasks(categoryId: string) {
    this.tasksList = this.toDoService.getTasks(categoryId);
    this.categoryHeading = this.toDoService.getTaskName(categoryId);
  }

  addNewTask(newTask: string) {
    this.toDoService.addTask(newTask);
  }

  ngOnInit(): void {
    this.displayTasks("tasks");
  }

}
