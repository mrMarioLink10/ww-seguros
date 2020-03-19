import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from './authorizations.component';
import { NewAuthorizationComponent } from './new-authorization/new-authorization.component';


const routes: Routes = [
  {
		path: '',
		pathMatch: 'full',
		component: AuthorizationsComponent,
		data: {
			slug: 'authorization',
			name: 'Autorizacion'
		}
	},
	{
		path: 'new-authorization',
		component: NewAuthorizationComponent,
		data: {
			slug: 'new-authorization',
			name: 'Nueva Autorizacion'
		}
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationsRoutingModule { }
