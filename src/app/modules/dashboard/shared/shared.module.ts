import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsContainerComponent } from './components/forms-container/forms-container.component';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog/dialog.component';



@NgModule({
  declarations: [FilterComponent, FormsContainerComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FilterComponent,
    FormsContainerComponent,
    DialogComponent
  ]
})
export class SharedModule { }
