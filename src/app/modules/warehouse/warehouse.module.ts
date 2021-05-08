import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseUploaderComponent } from './shared/components/warehouse-uploader/warehouse-uploader.component';
import { WarehouseFinderComponent } from './shared/components/warehouse-finder/warehouse-finder.component';
import { WarehouseFileItemComponent } from './shared/components/warehouse-file-item/warehouse-file-item.component';

// UI Modules
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseFinderComponent,
    WarehouseUploaderComponent,
    WarehouseFileItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WarehouseRoutingModule,

    // UI Modules
    NzCheckboxModule
  ]
})
export class WarehouseModule { }
