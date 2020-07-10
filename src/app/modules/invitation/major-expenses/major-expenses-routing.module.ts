import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorExpensesComponent } from './major-expenses.component';


const routes: Routes = [
  {
    path: ':key',
    pathMatch: 'full',
    component: MajorExpensesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorExpensesRoutingModule { }
