import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/auth/login/login.module';
import { DashboardLayoutModule } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { ModulesModule } from './modules/modules.module';
import { MatPaginatorIntl, MatSortModule } from '@angular/material';
import { MatPaginatorIntlCro } from './core/class/MatPaginatorIntl';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InvalidControlEnhancerPipe } from './core/pipes/invalid-control-enhancer.pipe';
import { RequestHandlerInterceptor } from './core/interceptor/request-handler.interceptor';
import { SharedModule } from './modules/dashboard/shared/shared.module';
import { GlobalSharedModule } from './shared/global-shared.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {CurrencyPipe} from '@angular/common'

const keycloakService = new KeycloakService();

@NgModule({
	declarations: [AppComponent, InvalidControlEnhancerPipe],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ModulesModule,
		GlobalSharedModule,
		MatTableModule,
		MatSortModule,
		FormsModule,
		MatProgressButtonsModule,
		MaterialFileInputModule
	],
	providers: [ CurrencyPipe,
		{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
		InvalidControlEnhancerPipe,
		{
			provide: KeycloakService, useValue: keycloakService
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestHandlerInterceptor,
			multi: true
		},
	],

	bootstrap: [AppComponent]
})
export class AppModule { }
