import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: [ './radio-button.component.scss' ]
})
export class RadioButtonComponent implements OnInit {
	@Input() title: string;
	@Input() options: FieldConfig;
	@Input() name: string;
	@Input() group: FormGroup;

	@Output() selected = new EventEmitter<any>();

	constructor() {}

	ngOnInit() {}

	emitter(event) {
		this.selected.emit({ valor: event.value, name: this.name });
	}
}
