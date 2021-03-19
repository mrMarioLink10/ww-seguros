import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyAdministrationComponent } from './policy-administration.component';
import { NewPolicyComponent } from './new-policy/new-policy.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PolicyAdministrationComponent,
  // canDeactivate: [CanExitGuard]
},
{
  path: 'new-policy',
  component: NewPolicyComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAdministrationRoutingModule { }
