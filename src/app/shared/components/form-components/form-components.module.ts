import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
	declarations: [ SelectComponent, InputComponent, RadioButtonComponent, DatePickerComponent ],
	exports: [ SelectComponent, InputComponent, RadioButtonComponent, DatePickerComponent ],
	imports: [ CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, CommonModule, RouterModule ]
})
export class FormComponentsModule {}
