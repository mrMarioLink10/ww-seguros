import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatDialogModule } from '@angular/material';
import { FormComponentsModule } from './components/form-components/form-components.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';

@NgModule({
	declarations: [BaseDialogComponent, NotFoundComponent, DynamicFormComponent, DynamicFieldComponent],
	imports: [CommonModule, MaterialModule, FormComponentsModule, MatDialogModule, FormsModule, NgxMaskModule],
	exports: [FormComponentsModule, MaterialModule, DynamicFormComponent, DynamicFieldComponent],
	entryComponents: [BaseDialogComponent]
})
export class GlobalSharedModule { }
