import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AppAuthGuard } from './core/guards/app-auth.guard';
import { CanExitGuard } from './core/guards/can-exit.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard/consult',
		pathMatch: 'full'
	},
	{
		path: 'app',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canLoad: [AppAuthGuard],
		// data: { roles: ['WWS', 'WWA'] }
	},
	{
		path: 'invitation',
		loadChildren: () => import('./modules/invitation/invitation.module').then((m) => m.InvitationModule),
		// canActivate: [AppAuthGuard],
		// data: { roles: ['WWS', 'WWA'] }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AppAuthGuard, CanExitGuard]
})
export class AppRoutingModule { }
