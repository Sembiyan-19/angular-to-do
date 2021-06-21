import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnChanges {

  constructor() { }

  @Input() tasksList = new Array();
  @Output() newTaskItem = new EventEmitter<string>();
  @Input() categoryHeading = "";
  isDisplayingSteps = false;
  @Output() importantIconId = new EventEmitter<string>();
  @Output() completeIconId = new EventEmitter<string>();
  @Output() taskId = new EventEmitter<string>();

  createTask(value: string, event: any) {
    if (13 === event.keyCode ) {
      this.newTaskItem.emit(value);
    }
  }

  markComplete(iconId: string) {
    this.completeIconId.emit(iconId);
  }

  markImportant(iconId: string) {
    this.importantIconId.emit(iconId);
  }

  displaySteps(taskId: string) {
    this.taskId.emit(taskId);
    this.isDisplayingSteps = true;
  }

  ngOnChanges(categoryHeading: SimpleChanges) {
    this.isDisplayingSteps = false;
  }
}
