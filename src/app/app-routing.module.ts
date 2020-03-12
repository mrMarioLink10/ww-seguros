import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{
		path: 'app',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
