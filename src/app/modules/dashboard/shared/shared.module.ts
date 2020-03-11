import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsContainerComponent } from './components/forms-container/forms-container.component';

@NgModule({
	declarations: [ FilterComponent, FormsContainerComponent ],
	imports: [ CommonModule, MaterialModule ],
	exports: [ FilterComponent, FormsContainerComponent ]
})
export class SharedModule {}
