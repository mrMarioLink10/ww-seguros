import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormularyDialog } from '../dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormularyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FormularyDialog) { }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
