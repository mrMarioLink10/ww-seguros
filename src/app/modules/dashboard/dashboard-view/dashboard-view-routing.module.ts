import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardViewComponent } from './dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardViewComponent,
    data: {
        slug: 'dashboard-view',
        name: 'Dashboard',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Dashboard',
            url: '/dashboard-view'
          }
        ]
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardViewRoutingModule {}
