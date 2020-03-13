import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: [ './text-area.component.scss' ]
})
export class TextAreaComponent implements OnInit {
	@Input() name: string;
	@Input() label: string;
	@Input() group: FormGroup;

	constructor() {}

	ngOnInit() {}
}
