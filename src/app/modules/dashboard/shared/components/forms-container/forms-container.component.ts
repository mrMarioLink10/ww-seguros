import { Component, OnInit, Input, ContentChild, TemplateRef, AfterContentInit, ContentChildren, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss']
})
export class FormsContainerComponent implements OnInit,AfterContentInit {
  step = 0;
  @Input() titles: Array<any>;
  @ContentChild('formTemplate', { static: false})formTemplateRef: TemplateRef<any>[];
  @ContentChildren('formTemplate') grouped;
  constructor(private renderer: Renderer, private elem: ElementRef) { }

  ngOnInit() {
   
  }
  ngAfterContentInit(){
    console.log(this.grouped);
    this.unsetAllOptions()
  }
  setStep(index: number) {this.step = index; }
  nextStep() {this.step++; }
  getForm(id) {return 'formTemplate' + id; }


  unsetAllOptions(){
    let elements = this.elem.nativeElement.querySelectorAll('.formElement');
    console.log(elements);
    // elements.forEach(element => {
    //  if(element.checked){
    //     element.checked = false
    //  }
    // });
  }
}