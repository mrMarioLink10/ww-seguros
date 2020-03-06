import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-claim',
	templateUrl: './claim.component.html',
	styleUrls: [ './claim.component.scss' ]
})
export class ClaimComponent implements OnInit {
	step = 0;
	Date: any;
	initialDate: any;
	finalDate: any;
	constructor() {}

	ngOnInit() {}

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}
}
