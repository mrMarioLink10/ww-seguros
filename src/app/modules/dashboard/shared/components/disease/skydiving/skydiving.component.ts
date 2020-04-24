import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-skydiving',
  templateUrl: './skydiving.component.html',
  styles: []
})
export class SkydivingComponent implements OnInit {

  accordionTitles=["Cuestionario"]

  // skydive:FormGroup;

  @Input() form:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.addBasicControls();

    // this.skydive= this.fb.group({

    //   name:['', Validators.required],
    //   goal:['', Validators.required],
    //   license:['', Validators.required],

    //   aircraft: this.fb.group({

    //     type:['', Validators.required],
    //     weight:['', Validators.required],
    //     total:['', Validators.required],
    //     average:['', Validators.required],
    //     flight_hours:['', Validators.required],

    //   }),
    //   info:['', Validators.required],
    //   flight:['', Validators.required]

    // });

    console.log(JSON.stringify(this.form.value));

  }

  addBasicControls(){

    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('goal', this.fb.control('', Validators.required));
    this.form.addControl('license', this.fb.control('', Validators.required));
    this.form.addControl('aircraft', this.fb.group({

      type:['', Validators.required],
      weight:['', Validators.required],
      total:['', [Validators.required, Validators.min(1)]],
      average:['', [Validators.required, Validators.min(1)]],
      flight_hours:['', [Validators.required, Validators.min(1)]]

    }));
    this.form.addControl('info', this.fb.control('', Validators.required));
    this.form.addControl('flight', this.fb.control('', Validators.required));

  }


}
