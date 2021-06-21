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

  /**
   * Adds a new category to the categories array
   * @param categoryName       name of the new category
   * @returns     id of newly created category
   */
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

  /**
   * Creates and provides a new category object
   * @param categoryName   namme of the category
   * @param categoryId     id of the category
   * @param categoryIcon    icon class to be used for the category
   * @returns     a category object
   */
  getCategoryObject(categoryName: string, categoryId: string, 
      categoryIcon: string) {
    let category = { name: categoryName, 
                     id: categoryId, 
                     icon: categoryIcon, 
                     tasks: new Array(),
                     taskCount: 0
                   }
    return category;
  }

  /**
   * Gives the category object through id of the category
   * @param categoryId     id of the category
   * @returns     category bject matching the id
   */
  getCategory(categoryId: string) {
    let currentCategory;
    this.categories.forEach ( (category) => {
      if (categoryId === category.id) {
        currentCategory = category;
      }
    });
    this.presentCategoryId = categoryId;
    return currentCategory;
  }

  /**
   * Creates a new task and adds it to the current category
   * @param taskName     name of task
   */
  addTask(taskName: string) {
    this.categories.forEach( (category) => {
      if (category.id === this.presentCategoryId) {
        category.taskCount++;
        let task = this.getTaskObject(taskName, category.id);
        category.tasks.push(task);
        if ("tasks" != category.id) {
          this.categories[4].tasks.push(task);
          this.categories[4].taskCount++;
        }
      }
    });
  }

  /**
   * Creates a new task object
   * @param taskName     name of the task
   * @param categoryId     id of the category to which the task belongs
   * @returns     task object
   */
  getTaskObject(taskName: string, categoryId: string) {
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

  /**
   * Marks a task complete/incomplete
   * @param iconId     id of icon clicked
   */
  markComplete(iconId: string) {
    this.categories.forEach( (category) => {
      if (category.id === this.presentCategoryId) {
        category.tasks.forEach ( (task) => {
          if (task.completeIconid === iconId) {
            task.isCompleted = !task.isCompleted;
          }
        });
      }
    });
    this.setTaskCount();
  }

  setTaskCount() {
    this.categories.forEach( (category) => {
      category.taskCount = this.getTaskCount(category);
    });
  }
  /**
   * Marks a task important/unimportant
   * @param iconId     id of icon clicked
   */
  markImportant(iconId: string) {
    this.categories.forEach( (category) => {
      if (category.id === this.presentCategoryId) {
        category.tasks.forEach ( (task) => {
          if (task.importantIconId === iconId) {
            if (task.isImportant) {
              task.isImportant = false;
              for (let k = 0; k < this.categories[1].tasks.length; k++) {
                if (iconId === this.categories[1].tasks[k].importantIconId) {
                    this.categories[1].tasks.splice(k, 1);
                }
              }
            } else {
              task.isImportant = true;
              this.categories[1].tasks.push(task);
            }
          }
        });
      }
    });
    this.setTaskCount();
  }

  /**
   * Provides the number tasks which are not completed
   * @param category     category object
   * @returns        number of tasks
   */
  getTaskCount(category: any) {
    let count = 0;
    category.tasks.forEach( (task: any) => {
      if (!task.isCompleted) {
        count++;
      }
    } );
    return count;
  }

  /**
   * Adds a new step to the task
   * @param newStep     name of the step
   */
  addStep(newStep: string) {
    let currentCategory: any = this.getCategory(this.presentCategoryId);
    currentCategory.tasks.forEach( (task: any) => {
      if (this.presentTaskId === task.id) {
        task.steps.push(newStep);
      }
    });
  }

  /**
   * Provides the task object
   * @param taskId    id of the task
   * @returns     task object
   */
  getTask(taskId: string) {
    this.presentTaskId = taskId;
    let taskObject: any = null;
    let currentCategory: any = this.getCategory(this.presentCategoryId);
    currentCategory.tasks.forEach( (task: any) => {
      if (taskId === task.id) {
        taskObject = task;
      }
    });
    return taskObject;
  }
}