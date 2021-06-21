import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }
  
  @Input() currentCategoryId = '';
  @Input() categories = new Array();
  @Output() newCategoryItem = new EventEmitter<string>();
  @Output() categoryId = new EventEmitter<string>();
  @ViewChild("newCategory") categoryInput: any;

  ngOnInit(): void {
    this.displayTasks("tasks");
  }

  /**
   * Emits the name of new category which is to be created
   * @param value     name of the category
   */
  createCategory(value: string) {
      this.newCategoryItem.emit(value);
      this.categoryInput.nativeElement.value = "";
  }

  /**
   * Emits the id of the category whose tasks should be displayed
   * @param categoryId     id of the category
   */
  displayTasks(categoryId: string) {
    this.categoryId.emit(categoryId);
  }
}
