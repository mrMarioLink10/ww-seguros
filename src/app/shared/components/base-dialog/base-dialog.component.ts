import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from './models/base-dialog';

@Component({
	selector: 'app-base-dialog',
	templateUrl: './base-dialog.component.html',
	styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<BaseDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: BaseDialog
	) { }

	ngOnInit() {
		this.data.email = '';
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
