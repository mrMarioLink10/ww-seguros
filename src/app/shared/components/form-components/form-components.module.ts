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

@NgModule({
	declarations: [SelectComponent, InputComponent, RadioButtonComponent,DatepickerViewsSelectionSingleMonth, DatePickerComponent, TextAreaComponent, NumberInputComponent],
	exports: [SelectComponent, InputComponent, RadioButtonComponent,DatepickerViewsSelectionSingleMonth, DatePickerComponent, TextAreaComponent, NumberInputComponent],
	imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, CommonModule, RouterModule]
})
export class FormComponentsModule { }
