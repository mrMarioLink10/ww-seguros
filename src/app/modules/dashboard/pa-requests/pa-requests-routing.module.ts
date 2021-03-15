import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaRequestsComponent } from './pa-requests.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PaRequestsComponent,
    data: {
      slug: 'requests',
      name: 'Solicitudes',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaRequestsRoutingModule { }
