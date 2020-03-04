import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/shared/layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  // },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/dashboard-view',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'claims',
        loadChildren: () => import('./modules/dashboard/claims/claims.module').then(m => m.ClaimsModule),
      },
      {
        path: 'dashboard-view',
        loadChildren: () => import('./modules/dashboard/dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule),
      },
      {
        path: 'information',
        loadChildren: () => import('./modules/dashboard/information/information.module').then(m => m.InformationModule),
      },
      {
        path: 'quotes',
        loadChildren: () => import('./modules/dashboard/quotes/quotes.module').then(m => m.QuotesModule),
      },
      {
        path: 'request-management',
        loadChildren: () => import('./modules/dashboard/request-management/request-management.module').then(m => m.RequestManagementModule),
      },
      {
        path: 'requests',
        loadChildren: () => import('./modules/dashboard/requests/requests.module').then(m => m.RequestsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
