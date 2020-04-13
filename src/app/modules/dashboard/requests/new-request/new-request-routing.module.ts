import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorExpensesComponent } from './major-expenses/major-expenses.component';
import { LifeComponent } from './life/life.component';
import { NewRequestComponent } from './new-request.component';
import { DisabilityComponent } from './disability/disability.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewRequestComponent,
    data: {
      slug: 'new-requests',
      name: 'Nueva Solicitud',
    }
  },
  { path: 'major-expenses', component: MajorExpensesComponent },
  { path: 'life', component: LifeComponent },
  { path: 'disability', component: DisabilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRequestRoutingModule { }
