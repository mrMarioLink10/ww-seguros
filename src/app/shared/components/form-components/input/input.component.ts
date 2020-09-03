import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FieldConfig } from '../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})

// tslint:disable: triple-equals
// tslint:disable: max-line-length
export class InputComponent implements OnInit, AfterViewChecked {
	@Input() label: string;
	@Input() name: string;
	@Input() value?: string;
	@Input() type: string;
	@Input() min: string;
	@Input() max: string;
	@Input() placeholder: string;
	@Input() disabled?: boolean;
	@Input() group: FormGroup;

	constructor(private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		if (this.value) {
			this.group.get(this.name).setValue(this.value);
		}
	}
	ngAfterViewChecked() {
		this.cdr.detectChanges();
	}

	omitSpecialChar(event) {
		let k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57) || k === 44 || k === 46 || k === 64 || k === 241 || k === 209);
	}
}
