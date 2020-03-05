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
import { DialogComponent } from './shared/component/dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,

  ],
  imports: [
    /** Modulos de importaciones */
    BrowserModule,
    BrowserAnimationsModule,

    /** Modulos de no se que */
    AppRoutingModule,
    // RouterModule,

    /** Modulos de componentes */
    ModulesModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
