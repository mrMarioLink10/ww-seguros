import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AppAuthGuard } from './core/guards/app-auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard/requests',
		pathMatch: 'full'
	},
	{
		path: 'app',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
		// canActivate: [AppAuthGuard],
		// data: { roles: ['WWS', 'WWA'] }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AppAuthGuard]
})
export class AppRoutingModule { }
