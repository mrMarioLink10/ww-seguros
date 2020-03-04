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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
