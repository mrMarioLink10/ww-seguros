import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { AppAuthGuard } from 'src/app/core/guards/app-auth.guard';

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
				// canActivate: [AppAuthGuard],
				loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule)
			},
			{
				path: 'authorizations',
				// canActivate: [AppAuthGuard],
				loadChildren: () => import('./authorizations/authorizations.module').then((m) => m.AuthorizationsModule)
			},
			// {
			//   path: 'dashboard-view',
			//   loadChildren: () => import('./dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule),
			// },
			{
				path: 'information',
				// canActivate: [AppAuthGuard],
				loadChildren: () => import('./information/information.module').then((m) => m.InformationModule)
			},
			{
				path: 'quotes',
				// canActivate: [AppAuthGuard],
				loadChildren: () => import('./quotes/quotes.module').then((m) => m.QuotesModule)
			},
			// {
			//   path: 'request-management',
			//   loadChildren: () => import('./request-management/request-management.module').then(m => m.RequestManagementModule),
			// },
			{
				path: 'requests',
				// canActivate: [AppAuthGuard],
				loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule)
			},
      {
        path: 'consult',
        // canActivate: [AppAuthGuard],
        loadChildren: () => import('./consultation/consultation.module').then((m) => m.ConsultationModule)
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
