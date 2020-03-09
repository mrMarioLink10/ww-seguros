import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [],
	imports: [ CommonModule, DashboardModule, ReactiveFormsModule ],
	exports: [ ReactiveFormsModule ]
})
export class ModulesModule {}
