import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisabilityComponent } from './disability.component';


const routes: Routes = [
  {
    path: ':key',
    pathMatch: 'full',
    component: DisabilityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisabilityRoutingModule { }
