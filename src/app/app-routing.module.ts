import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutShellComponent } from './modules/core/layout-shell/layout-shell.component';
import { LoginComponent } from './shared/components/login/login.component';
import { LogoutComponent } from './shared/components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutShellComponent,
    children: [
      {
        path: 'warehouse',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/warehouse/warehouse.module').then(
            (m) => m.WarehouseModule
          ),
        data: {
          breadcrumb: 'Warehouse'
        }
      },
      {
        path: 'pethernet',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/pethernet/pethernet.module').then(
            (m) => m.PethernetModule
          ),
        data: {
          breadcrumb: 'Pethernet'
        }
      },
    ]
  },
  // { path: 'pethernet', loadChildren: () => import('./modules/pethernet/pethernet.module').then(m => m.PethernetModule) },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
