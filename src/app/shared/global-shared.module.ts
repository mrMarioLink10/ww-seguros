import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
	declarations: [ BaseDialogComponent ],
	imports: [ CommonModule, MaterialModule ],
	entryComponents: [ BaseDialogComponent ]
})
export class GlobalSharedModule {}
