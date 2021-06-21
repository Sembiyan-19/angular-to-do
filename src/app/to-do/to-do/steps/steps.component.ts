import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

@Input() task: any = null;
@Output() newStepItem = new EventEmitter<string>();
@Output() importantIconId = new EventEmitter<string>();
@Output() completeIconId = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  createStep(value: string, event: any) {
    if (13 === event.keyCode ) {
      this.newStepItem.emit(value);
    }
  }

  markComplete(iconId: string) {
    this.completeIconId.emit(iconId);
  }

  markImportant(iconId: string) {
    this.importantIconId.emit(iconId);
  }

}
