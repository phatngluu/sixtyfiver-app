import { Component, OnInit } from '@angular/core';
import { WarehouseService } from './shared/service/warehouse.service';
import { FileModel } from './shared/models/file-model'

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
