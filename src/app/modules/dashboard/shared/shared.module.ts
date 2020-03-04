import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';



@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FilterComponent
  ]
})
export class SharedModule { }
