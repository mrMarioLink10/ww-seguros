import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicPaComponent } from './dynamic-pa.component';
import { CanExitGuard } from 'src/app/core/guards/can-exit.guard';
import { QuoteComponent } from './quote/quote.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicPaRoutingModule { }
