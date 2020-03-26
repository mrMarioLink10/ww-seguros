import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorExpensesComponent } from './major-expenses/major-expenses.component';
import { LifeComponent } from './life/life.component';


const routes: Routes = [

  { path: 'major-expenses', component: MajorExpensesComponent },
  { path: 'life', component: LifeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRequestRoutingModule { }
