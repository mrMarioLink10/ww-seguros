import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultationComponent} from './consultation.component';
import {PolicyDetailsComponent} from "./policy-details/policy-details/policy-details.component";


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
  },
  {
    path: 'policy/:policyId',
    component: PolicyDetailsComponent,
    data: {
      slug: 'consultation',
      name: 'Consultas de Polizas',
      breadcrumb: [
        {
          label: '',
          url: '/'
        },
        {
          label: 'Consultas',
          url: '/consults'
        },
        {
          label: 'Detalles de Póliza',
          url: '/policy'
        }
      ]
    }
  },
  {
    path: 'policy',
    component: PolicyDetailsComponent,
    data: {
      slug: 'consultation',
      name: 'Consultas de Polizas',
      breadcrumb: [
        {
          label: '',
          url: '/'
        },
        {
          label: 'Consultas',
          url: '/consults'
        },
        {
          label: 'Detalles de Póliza',
          url: '/policy'
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
