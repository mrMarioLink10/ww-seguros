import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuotesComponent } from '../quotes/quotes.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuotesComponent,
    data: {
        slug: 'quotes',
        name: 'Cotizaciones',
        breadcrumb: [
          {
            label: '',
            url: '/'
          },
          {
            label: 'Cotizaciones',
            url: '/quotes'
          }
        ]
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule {}
