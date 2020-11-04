import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyAdministrationComponent } from './policy-administration.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PolicyAdministrationComponent,
  // canDeactivate: [CanExitGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAdministrationRoutingModule { }
