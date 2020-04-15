import { Component, OnInit, Input, ɵConsole, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: FieldConfig;
  @Input() group: FormGroup;
  @Input() name: string;

  @Output() selected = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.options.name){
      this.name = this.options.name
    }
  }

  emitter(event) {
		this.selected.emit({ valor: event.value });
	}

}
