import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from './authorizations.component';
import { NewAuthorizationComponent } from './new-authorization/new-authorization.component';
import { CanExitGuard } from 'src/app/core/guards/can-exit.guard';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: AuthorizationsComponent,
	},
	{
		path: 'new-authorization',
		component: NewAuthorizationComponent,
		canDeactivate: [CanExitGuard]
	}
	,
	{
		path: 'new-authorization/:id',
		component: NewAuthorizationComponent,
		canDeactivate: [CanExitGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorizationsRoutingModule { }
