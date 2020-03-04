import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestManagementComponent } from './request-management.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RequestManagementComponent,
    data: {
        slug: 'request-management',
        name: 'Gestión de solicitudes',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Gestión de solicitudes',
            url: '/request-management'
          }
        ]
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestManagementRoutingModule {}
