import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatDialogModule } from '@angular/material';
import { FormComponentsModule } from './components/form-components/form-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [BaseDialogComponent],
	imports: [CommonModule, MaterialModule, FormComponentsModule, MatDialogModule, FormsModule],
	exports: [FormComponentsModule, MaterialModule],
	entryComponents: [BaseDialogComponent]
})
export class GlobalSharedModule { }
