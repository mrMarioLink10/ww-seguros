import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorExpensesComponent } from './major-expenses/major-expenses.component';
import { LifeComponent } from './life/life.component';
import { NewRequestComponent } from './new-request.component';
import { DisabilityComponent } from './disability/disability.component';
import { CanExitGuard } from 'src/app/core/guards/can-exit.guard';


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
  { path: 'major-expenses', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'major-expenses/data/:id', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'major-expenses/:noCotizacion', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'life', component: LifeComponent, canDeactivate: [CanExitGuard] },
  { path: 'disability', component: DisabilityComponent, canDeactivate: [CanExitGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRequestRoutingModule { }
