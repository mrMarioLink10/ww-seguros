import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';

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
				loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule)
			},
			// {
			//   path: 'dashboard-view',
			//   loadChildren: () => import('./dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule),
			// },
			{
				path: 'information',
				loadChildren: () => import('./information/information.module').then((m) => m.InformationModule)
			},
			{
				path: 'quotes',
				loadChildren: () => import('./quotes/quotes.module').then((m) => m.QuotesModule)
			},
			// {
			//   path: 'request-management',
			//   loadChildren: () => import('./request-management/request-management.module').then(m => m.RequestManagementModule),
			// },
			{
				path: 'requests',
				loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule)
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
