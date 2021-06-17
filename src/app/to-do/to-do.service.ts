import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }

  untitledListCount = -1;
  newListCount = 0;
  presentCategoryId = "tasks";
  categories = [
    this.getCategoryObject("My Day", "my-day", "far fa-sun"),
    this.getCategoryObject("Important", "important", "far fa-star"),
    this.getCategoryObject("Planned", "planned", "far fa-calendar-alt"),
    this.getCategoryObject("Assigned to you", "assigned-to-you", "far fa-user"),
    this.getCategoryObject("Tasks", "tasks", "fas fa-home")
  ];

  addnewCategory(categoryName: string) {
    this.newListCount++;
    if ("" == categoryName) {
      this.untitledListCount++;
      categoryName = "Untitled list (" + this.untitledListCount + ")";
    }
    let newCategory = this.getCategoryObject(categoryName,
        "added-category-" + this.newListCount, "fas fa-list-ul");
    this.categories.push(newCategory);
  }

  getCategoryObject(categoryName: string, categoryId: string, categoryIcon: string) {
    let category = { name: categoryName, 
                     id: categoryId, 
                     icon: categoryIcon, 
                     tasks: new Array(),
                     taskCount: 0
                   }
    return category;
  }

  getCategory(categoryId: string) {
    let currentCategory;
    this.categories.forEach ( (category) => {
      if (categoryId === category.id) {
        currentCategory = category;
      }
    });
    return currentCategory;
  }

  addTask(taskName: string) {
    let currentCategory: any =  this.getCategory(this.presentCategoryId);
    currentCategory.taskCount++;
    let task = this.getTask(taskName, currentCategory.id);
    currentCategory.tasks.push(task);
    if ("tasks" != currentCategory.id) {
      this.categories[4].tasks.push(task);
      this.categories[4].taskCount++;
    }
  }

  getTasks(categoryId: string) {
    this.presentCategoryId = categoryId;
    let currentCategory: any =  this.getCategory(categoryId);
    return currentCategory.tasks;
  }

  getTaskName(categoryId: string) {
    let currentCategory: any =  this.getCategory(categoryId);
    return currentCategory.name;
  }

  getTask(taskName: string, categoryId: string) {
    let isImportantTask = false;
    if ("important" === categoryId) {
      isImportantTask = true;
    }
    let task = { name: taskName, 
                 isCompleted: false,
                 isImportant: isImportantTask
               };
    return task;
  }
}