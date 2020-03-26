import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { NewRequestComponent } from './new-request/life/new-request.component';
import { NewSubscriptionRequestComponent } from './new-subscription-request/new-subscription-request/new-subscription-request.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RequestsComponent,
    data: {
      slug: 'requests',
      name: 'Solicitudes',
    }
  }, {
    path: 'new-requests',
    component: NewRequestComponent,
    data: {
      slug: 'new-requests',
      name: 'Nueva Solicitud',
    }
  }, {
    path: 'new-subscription-requests',
    component: NewSubscriptionRequestComponent,
    data: {
      slug: 'new-requests',
      name: 'Nueva Solicitud',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
