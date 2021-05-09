import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WarehouseFinderComponent } from './shared/components/warehouse-finder/warehouse-finder.component';

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  constructor() {}

  @ViewChild('warehouseFinder') warehouseFinder: ElementRef<WarehouseFinderComponent>;

  ngAfterViewInit(): void {

    console.log(this.warehouseFinder);
    console.log(this.warehouseFinder.nativeElement);
  }

  ngOnInit(): void {}
}
