import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarehouseRoutingModule } from './warehouse-routing.module';

// Directives
import { UploaderDirective } from './shared/directives/uploader/uploader.directive';
import { FinderDirective } from './shared/directives/finder/finder.directive';

// Components
import { WarehouseComponent } from './warehouse.component';
import { WarehouseUploaderComponent } from './shared/components/warehouse-uploader/warehouse-uploader.component';
import { WarehouseFinderComponent } from './shared/components/warehouse-finder/warehouse-finder.component';
import { WarehouseFinderToolbarComponent } from './shared/components/warehouse-finder-toolbar/warehouse-finder-toolbar.component';

// Pipes
import { BeautifySizePipe } from './shared/pipes/beautify-size/beautify-size.pipe';

// UI Modules
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';



@NgModule({
  declarations: [
    // Directives
    UploaderDirective,
    FinderDirective,

    // Components
    WarehouseComponent,
    WarehouseFinderComponent,
    WarehouseUploaderComponent,

    // Pipes
    BeautifySizePipe,
    WarehouseFinderToolbarComponent,
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
    NzMessageModule,
    NzSpaceModule,
    NzUploadModule
  ],
  exports: [
    BeautifySizePipe
  ]
})
export class WarehouseModule { }
