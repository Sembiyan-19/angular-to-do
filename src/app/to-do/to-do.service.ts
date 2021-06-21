import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }

  untitledListCount = -1;
  newListCount = 0;
  taskCount = 0;
  presentCategoryId = "tasks";
  presentTaskId = "";
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
    this.presentCategoryId = newCategory.id;
    return this.presentCategoryId;
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
    this.taskCount++;
    let task = { name: taskName, 
                 id: "task" + this.taskCount,
                 isCompleted: false,
                 isImportant: isImportantTask,
                 completeIconid: "complete-icon-" + this.taskCount,
                 importantIconId: "important-icon-" + this.taskCount,
                 steps: new Array()
               };
    return task;
  }

  markComplete(iconId: string) {
    let caregories = this.categories;
    let j = -1;
    caregories.forEach( (caregory) => {
      j++;
      if (caregory.id === this.presentCategoryId) {
        for (let i = 0; i < caregory.tasks.length; i++) {
          if (caregory.tasks[i].completeIconid === iconId) {
            this.categories[j].tasks[i].isCompleted = !this.categories[j].tasks[i].isCompleted;
            this.categories[j].taskCount = this.getTaskCount(this.categories[j]);
          }
        }
      }
    });
  }

  markImportant(iconId: string) {
    let caregories = this.categories;
    let j = -1;
    caregories.forEach( (caregory) => {
      j++;
      if (caregory.id === this.presentCategoryId) {
        for (let i = 0; i < caregory.tasks.length; i++) {
          console.log(caregory.tasks);
          if (caregory.tasks[i].importantIconId === iconId) {
            if (caregory.tasks[i].isImportant) {
              this.categories[j].tasks[i].isImportant = false;
              for (let k = 0; k < this.categories[1].tasks.length; k++) {
                if (iconId === this.categories[1].tasks[k].importantIconId) {
                    this.categories[1].tasks.splice(k, 1);
                }
              }
            } else {
              this.categories[j].tasks[i].isImportant = true;
              this.categories[1].tasks.push(caregory.tasks[i]);
            }
            this.categories[1].taskCount = this.getTaskCount(this.categories[1]);
          }
        }
      }
    }); 
  }

  getTaskCount(category: any) {
    let count = 0;
    category.tasks.forEach( (task: any) => {
      if (!task.isCompleted) {
        count++;
      }
    } );
    return count;
  }

  addStep(newStep: string) {
    let currentCategory: any = this.getCategory(this.presentCategoryId);
    currentCategory.tasks.forEach( (task: any) => {
      if (this.presentTaskId === task.id) {
        task.steps.push(newStep);
      }
    });
  }

  getSteps(taskId: string) {
    this.presentTaskId = taskId;
    let stepsList: any = null;
    let currentCategory: any = this.getCategory(this.presentCategoryId);
    currentCategory.tasks.forEach( (task: any) => {
      if (taskId === task.id) {
        stepsList = task;
      }
    });
    return stepsList;
  }



}