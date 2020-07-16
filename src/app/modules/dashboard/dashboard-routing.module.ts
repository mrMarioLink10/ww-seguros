import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { AppAuthGuard } from 'src/app/core/guards/app-auth.guard';
import { WwmAccessGuard } from '../../core/guards/wwm-access.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'information',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardLayoutComponent,
		children: [
			{
				path: 'claims',
				loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule),
				canLoad: [AppAuthGuard],
				canActivate: [WwmAccessGuard]
			},
			{
				path: 'authorizations',
				canLoad: [AppAuthGuard],
				canActivate: [WwmAccessGuard],
				loadChildren: () => import('./authorizations/authorizations.module').then((m) => m.AuthorizationsModule)
			},
			// {
			//   path: 'dashboard-view',
			//   loadChildren: () => import('./dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule),
			// },
			{
				path: 'information',
				loadChildren: () => import('./information/information.module').then((m) => m.InformationModule),
				canLoad: [AppAuthGuard],
			},
			{
				path: 'quotes',
				loadChildren: () => import('./quotes/quotes.module').then((m) => m.QuotesModule),
				canLoad: [AppAuthGuard],
			},
			// {
			//   path: 'request-management',
			//   loadChildren: () => import('./request-management/request-management.module').then(m => m.RequestManagementModule),
			// },
			{
				path: 'requests',
				loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule),
				canLoad: [AppAuthGuard],
			},
			{
				path: 'consult',
				loadChildren: () => import('./consultation/consultation.module').then((m) => m.ConsultationModule),
				canLoad: [AppAuthGuard],
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AppAuthGuard]
})
export class DashboardRoutingModule { }
