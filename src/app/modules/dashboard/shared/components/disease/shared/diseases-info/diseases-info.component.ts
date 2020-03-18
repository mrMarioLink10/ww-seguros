import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-diseases-info',
	templateUrl: './diseases-info.component.html',
	styles: []
})
export class DiseasesInfoComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() group: string;
	getForm: any;
	constructor() {}

	ngOnInit() {
		this.getForm = this.form.get(this.group);
	}
}
