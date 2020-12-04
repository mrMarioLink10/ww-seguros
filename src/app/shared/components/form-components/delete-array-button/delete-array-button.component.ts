import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-array-button',
  templateUrl: './delete-array-button.component.html',
  styles: []
})
export class DeleteArrayButtonComponent {

  @Input() array: any[];
  @Input() index: any;

  removeToList(array, index) {
    array.removeAt(index);
  }

}
