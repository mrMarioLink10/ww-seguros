import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-new-claim',
	templateUrl: './new-claim.component.html',
	styleUrls: [ './new-claim.component.scss' ]
})
export class NewClaimComponent implements OnInit {
	selectedClaimType: string;

	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {}

	selectChange(event) {
		switch (event) {
			case 'reclamacion':
				this.router.navigate([ 'claim' ], { relativeTo: this.route });
				break;

			case 'rembolso':
				this.router.navigate([ 'refund' ], { relativeTo: this.route });
				break;

			default:
				break;
		}
	}
}
