import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultationComponent} from './consultation.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultationComponent,
    pathMatch: 'full',
    data: {
      slug: 'consultation',
      name: 'Consultas',
      breadcrumb: [
        {
          label: '',
          url: '/'
        },
        {
          label: 'Consultas',
          url: '/consults'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule { }
