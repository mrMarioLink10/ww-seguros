import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InformationComponent } from './information.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InformationComponent,
    data: {
        slug: 'information',
        name: 'Datos',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Datos',
            url: '/information'
          }
        ]
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {}
