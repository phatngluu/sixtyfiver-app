import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutShellComponent } from './modules/core/layout-shell/layout-shell.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [
      {
        path: 'warehouse',
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
  { path: 'pethernet', loadChildren: () => import('./modules/pethernet/pethernet.module').then(m => m.PethernetModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
