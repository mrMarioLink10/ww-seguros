import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: []
})
export class DynamicFormComponent implements OnInit {

  step: number;

  constructor() { }

  @Input() form: FormGroup;
  @Input() ID: any = null;
  @Input() fakeForm: any;

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  showWarningDot(form: any): boolean {
    if (!this.ID) {
      if (!form.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      if (form.valid) {
        return false;
      } else {
        return true;
      }
    }
  }
}
