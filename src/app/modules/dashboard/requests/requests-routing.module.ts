import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { NewRequestComponent } from './new-request/new-request/new-request.component';


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
    pathMatch: 'full',
    component: NewRequestComponent,
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
export class RequestsRoutingModule {}
