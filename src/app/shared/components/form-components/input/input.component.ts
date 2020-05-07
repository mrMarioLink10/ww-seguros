import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from '../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
	@Input() label: string;
	@Input() name: string;
	@Input() type: string;
	@Input() min: string;
	@Input() max: string;
	@Input() placeholder: string;
	@Input() disabled?: boolean;
	@Input() group: FormGroup;

	constructor() { }

	ngOnInit() { }
}
