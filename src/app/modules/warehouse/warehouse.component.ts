import { Component, OnInit } from '@angular/core';
import { WarehouseService } from './shared/service/warehouse.service';
import { File } from './shared/models/file'

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  fetchedFiles: File[];

  constructor(
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit(): void {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
    })
  }ß

}
