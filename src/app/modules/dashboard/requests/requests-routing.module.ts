import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RequestsComponent,
    data: {
        slug: 'requests',
        name: 'Solicitudes',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Solicitudes',
            url: '/requests'
          }
        ]
      }
  }, {
    path: '',
    pathMatch: 'full',
    component: RequestsComponent,
    data: {
        slug: 'newRequests',
        name: 'Nueva Solicitud',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Nueva Solicitud',
            url: '/newRequests'
          }
        ]
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
