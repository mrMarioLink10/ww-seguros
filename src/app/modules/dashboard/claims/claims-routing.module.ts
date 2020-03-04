import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClaimsComponent } from './claims.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClaimsComponent,
    data: {
        slug: 'claims',
        name: 'Reclamos',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Reclamos',
            url: '/claims'
          }
        ]
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule {}
