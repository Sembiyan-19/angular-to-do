import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor() { }
  
  @Input() categories = new Array();
  @Output() newCategoryItem = new EventEmitter<string>();
  @Output() categoryId = new EventEmitter<string>();

  createCategory(value: string, event: any) {
    if (event.keyCode == 13) {
      this.newCategoryItem.emit(value);
    }
  }

  displayTasks(value: string) {
    this.categoryId.emit(value);
  }

}
