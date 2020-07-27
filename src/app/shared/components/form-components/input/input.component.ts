import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FieldConfig } from '../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
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
}
