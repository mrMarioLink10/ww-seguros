import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/auth/login/login.module';
import { DashboardLayoutModule } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { ModulesModule } from './modules/modules.module';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from './core/class/MatPaginatorIntl';
import { HttpClientModule } from '@angular/common/http';
import { InvalidControlEnhancerPipe } from './core/pipes/invalid-control-enhancer.pipe';

@NgModule({
	declarations: [AppComponent, InvalidControlEnhancerPipe],
	imports: [
		/** Modulos de importaciones */
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,

		AppRoutingModule,
		// RouterModule,

		/** Modulos de componentes */
		ModulesModule
	],
	providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }, InvalidControlEnhancerPipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
