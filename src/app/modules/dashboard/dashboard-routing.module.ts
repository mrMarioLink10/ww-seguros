import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { AppAuthGuard } from 'src/app/core/guards/app-auth.guard';
import { WwmAccessGuard } from '../../core/guards/wwm-access.guard';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

// tslint:disable: max-line-length
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
				canActivate: [WwmAccessGuard],
				data: { accessRoles: ['Solicitud_reembolsos'] }
			},
			{
				path: 'authorizations',
				loadChildren: () => import('./authorizations/authorizations.module').then((m) => m.AuthorizationsModule),
				canLoad: [AppAuthGuard],
				canActivate: [WwmAccessGuard],
				data: { accessRoles: ['Solicitud_precertificacion'] }
			},
			{
				path: 'quotes',
				loadChildren: () => import('./quotes/quotes.module').then((m) => m.QuotesModule),
				canLoad: [AppAuthGuard],
				data: { accessRoles: ['Cotizador_Vida', 'Cotizador_Salud'] }
			},
			{
				path: 'requests',
				loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule),
				canLoad: [AppAuthGuard],
				data: { accessRoles: ['Solicitud_suscripcion'] }

			},
			{
				path: 'consult',
				loadChildren: () => import('./consultation/consultation.module').then((m) => m.ConsultationModule),
				canLoad: [AppAuthGuard],
				data: { accessRoles: ['Datos_polizas', 'Datos_facturas'] }
			},
			{
				path: 'settings',
				loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
				canLoad: [AppAuthGuard],
				data: { accessRoles: [] }
			}
		]
	},
	{
		path: 'not-found',
		component: NotFoundComponent,
	},
	// { path: '**', redirectTo: '/not-found' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AppAuthGuard]
})
export class DashboardRoutingModule { }
