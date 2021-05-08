import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarehouseRoutingModule } from './warehouse-routing.module';

// Components
import { WarehouseComponent } from './warehouse.component';
import { WarehouseUploaderComponent } from './shared/components/warehouse-uploader/warehouse-uploader.component';
import { WarehouseFinderComponent } from './shared/components/warehouse-finder/warehouse-finder.component';

// Pipes
import { BeautifySizePipe } from './shared/pipes/beautify-size/beautify-size.pipe';

// UI Modules
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [
    // Components
    WarehouseComponent,
    WarehouseFinderComponent,
    WarehouseUploaderComponent,

    // Pipes
    BeautifySizePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    WarehouseRoutingModule,

    // UI Modules
    NzCheckboxModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzSpaceModule
  ],
  exports: [
    BeautifySizePipe
  ]
})
export class WarehouseModule { }
