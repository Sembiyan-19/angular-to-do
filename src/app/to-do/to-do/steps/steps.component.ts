import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  addButtonClass = "hide-add-button add-step-button";
  isOnFocus = false;
  @Input() task: any = null;
  @Output() newStepItem = new EventEmitter<string>();
  @Output() importantIconId = new EventEmitter<string>();
  @Output() completeIconId = new EventEmitter<string>();
  @ViewChild("newStep") stepInput: any = "";

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits the name of new step which is to be created
   * @param value     name of the step
   */
  createStep(value: string) {
      this.newStepItem.emit(value);
      this.stepInput.nativeElement.value = "";
      this.addButtonClass = "hide-add-button add-step-button";
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
   * Toggle the classes in add button
   * @param value     value present in input field
   */
  oninput(value: string) {
    if ("" === value) {
      this.addButtonClass = "hide-add-button add-step-button";
    } else {
      this.addButtonClass = "display-add-button add-step-button";
    }
  }

  onBlur() {
    this.isOnFocus = false;
  }

  onFocus() {
    this.isOnFocus = true;
  }

}
