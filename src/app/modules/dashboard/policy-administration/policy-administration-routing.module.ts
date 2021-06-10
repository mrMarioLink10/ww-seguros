import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyAdministrationComponent } from './policy-administration.component';
import { NewPolicyComponent } from './new-policy/new-policy.component';
import { CanExitGuard } from 'src/app/core/guards/can-exit.guard';
import { PolicyAdministationResolverService } from './services/policy-administation-resolver.service';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PolicyAdministrationComponent,
  canDeactivate: [CanExitGuard]
},
{
  path: 'new-policy',
  component: NewPolicyComponent,
  canDeactivate: [CanExitGuard]
},
{
  path: 'new-policy/edit',
  component: NewPolicyComponent,
  canDeactivate: [CanExitGuard],
  resolve: { data: PolicyAdministationResolverService }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAdministrationRoutingModule { }
