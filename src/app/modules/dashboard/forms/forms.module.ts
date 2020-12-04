import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { NewFormComponent } from './new-form/new-form.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalSharedModule } from '../../../shared/global-shared.module';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [FormsComponent, NewFormComponent, EditFieldComponent, FilterComponent],
  entryComponents: [EditFieldComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    GlobalSharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormsDashboardModule { }
