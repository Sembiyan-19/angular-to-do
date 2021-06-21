import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnChanges {

  constructor() { }

  addButtonClass = "hide-add-button add-task-button";
  isDisplayingSteps = false;
  isOnFocus = false;
  @Input() category:any = null;
  @Input() emptyList = new Array();
  @Output() completeIconId = new EventEmitter<string>();
  @Output() newTaskItem = new EventEmitter<string>();
  @Output() importantIconId = new EventEmitter<string>();
  @Output() taskId = new EventEmitter<string>();
  @ViewChild("newTask") taskInput: any;

 ngOnChanges(category: SimpleChanges) {
   this.isDisplayingSteps = false;
 }

 /**
  * Emits the name of new task which is to be created
  * @param value     name of the task
  */
  createTask(value: string) {
    this.newTaskItem.emit(value);
    this.taskInput.nativeElement.value = "";
    this.addButtonClass = "hide-add-button add-task-button";
  }

  /**
   * Marks a task complete/incomplete
   * @param iconId     id of icon clicked
   */
  markComplete(iconId: string) {
    this.completeIconId.emit(iconId);
  }

  /**
   * Marks a task important/unimportant
   * @param iconId     id of icon clicked
   */
  markImportant(iconId: string) {
    this.importantIconId.emit(iconId);
  }

  /**
   * Emits the id of the task whose steps should be displayed
   * @param taskId     id of the task
   */
  displaySteps(taskId: string) {
    this.taskId.emit(taskId);
    this.isDisplayingSteps = true;
  }

  /**
   * Toggle the classes in add button
   * @param value     value present in input field
   */
  oninput(value: string) {
    if ("" === value) {
      this.addButtonClass = "hide-add-button add-task-button";
    } else {
      this.addButtonClass = "display-add-button add-task-button";
    }
  }

  onBlur() {
    this.isOnFocus = false;
  }

  onFocus() {
    this.isOnFocus = true;
  }
}
