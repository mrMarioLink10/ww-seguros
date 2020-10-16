import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { NewFormComponent } from './new-form/new-form.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormsComponent,
  },
  {
    path: 'new-form',
    component: NewFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
