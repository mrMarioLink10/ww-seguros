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
  { path: 'salud', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'salud/cotizacion/:noCotizacion', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'salud/:id', component: MajorExpensesComponent, canDeactivate: [CanExitGuard] },
  { path: 'vida', component: LifeComponent, canDeactivate: [CanExitGuard] },
  { path: 'vida/cotizacion/:noCotizacion', component: LifeComponent, canDeactivate: [CanExitGuard] },
  { path: 'vida/:id', component: LifeComponent, canDeactivate: [CanExitGuard] },
  { path: 'disability', component: DisabilityComponent, canDeactivate: [CanExitGuard] },
  { path: 'disability/:id', component: DisabilityComponent, canDeactivate: [CanExitGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRequestRoutingModule { }
