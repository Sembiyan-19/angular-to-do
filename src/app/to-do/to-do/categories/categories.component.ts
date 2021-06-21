import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }
  
  @Input() categories = new Array();
  @Output() newCategoryItem = new EventEmitter<string>();
  @Output() categoryId = new EventEmitter<string>();
  @Input() currentCategoryId = '';

  ngOnInit(): void {
    this.displayTasks("tasks");
  }

  createCategory(value: string, event: any) {
    if (event.keyCode == 13) {
      this.newCategoryItem.emit(value);
    }
  }

  displayTasks(value: string) {
    this.categoryId.emit(value);
  }

}
