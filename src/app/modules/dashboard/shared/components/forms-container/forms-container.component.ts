import { Component, OnInit, Input, ElementRef, ContentChildren} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss']
})
export class FormsContainerComponent implements OnInit{
  step = 0;
  @Input() titles: Array<any>;
  @Input() Form: FormGroup;
  @ContentChildren('formTemplate') grouped;

  constructor( private elem: ElementRef) { }

  ngOnInit() {}

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    
    this.step++;
  }
}
