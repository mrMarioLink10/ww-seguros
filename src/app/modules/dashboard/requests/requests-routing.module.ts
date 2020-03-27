import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestsComponent } from './requests.component';
import { LifeComponent } from './new-request/life/life.component';
import { MajorExpensesComponent } from './new-request/major-expenses/major-expenses.component';
import { NewRequestComponent } from './new-request/new-request.component';


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
    loadChildren: () => import('./new-request/new-request.module').then(m => m.NewRequestModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
