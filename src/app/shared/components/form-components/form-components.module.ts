import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatepickerViewsSelectionSingleMonth } from './date-picker/date-picker-onlymonth.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { NgxMaskModule } from 'ngx-mask';
import { FileInputComponent } from './file-input/file-input.component';
import { AuthorizationsRoutingModule } from 'src/app/modules/dashboard/authorizations/authorizations-routing.module';
import { GlobalSharedModule } from '../../global-shared.module';
import { SharedModule } from 'src/app/modules/dashboard/shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SectionABlockComponent } from './section-a-block/section-a-block.component';

@NgModule({
	declarations: [
		SelectComponent,
		InputComponent,
		RadioButtonComponent,
		DatepickerViewsSelectionSingleMonth,
		DatePickerComponent,
		TextAreaComponent,
		NumberInputComponent,
		FileInputComponent,
		SectionABlockComponent,
	],
	exports: [
		SelectComponent,
		InputComponent,
		RadioButtonComponent,
		DatepickerViewsSelectionSingleMonth,
		DatePickerComponent,
		TextAreaComponent,
		NumberInputComponent,
		FileInputComponent,
		SectionABlockComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		NgxMaskModule,
		MaterialFileInputModule
	]
})
export class FormComponentsModule { }
