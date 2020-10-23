import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-array-button',
  templateUrl: './add-array-button.component.html',
  styles: []
})
export class AddArrayButtonComponent {

  @Input() array: any[];
  @Input() item: any;

  addToList(array, item) {
    array.push(item);
  }
}
