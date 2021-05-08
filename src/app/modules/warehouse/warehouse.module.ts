import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseUploaderComponent } from './shared/components/warehouse-uploader/warehouse-uploader.component';
import { WarehouseFinderComponent } from './shared/components/warehouse-finder/warehouse-finder.component';


@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseFinderComponent,
    WarehouseUploaderComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
