import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  constructor() { }

  @Input() tasksList = new Array();
  @Output() newTaskItem = new EventEmitter<string>();
  @Input() categoryHeading = "";

  createTask(value: string, event: any) {
    if (13 === event.keyCode ) {
      this.newTaskItem.emit(value);
    }
  }

}
