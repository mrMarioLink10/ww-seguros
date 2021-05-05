import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicPaComponent } from './dynamic-pa.component';
import { CanExitGuard } from 'src/app/core/guards/can-exit.guard';
import { QuoteComponent } from './quote/quote.component';
import { ChangeComponent } from './change/change.component';
import { ChangeResolverService } from './services/change-resolver.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DynamicPaComponent,
    canDeactivate: [CanExitGuard]
  },
  {
    path: 'quote',
    component: QuoteComponent,
    canDeactivate: [CanExitGuard]
  },
  {
    path: 'change',
    component: ChangeComponent,
    canDeactivate: [CanExitGuard],
    resolve: { data: ChangeResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicPaRoutingModule { }
