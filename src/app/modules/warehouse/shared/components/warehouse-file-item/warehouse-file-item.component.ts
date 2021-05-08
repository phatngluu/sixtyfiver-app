import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-warehouse-file-item',
  templateUrl: './warehouse-file-item.component.html',
  styleUrls: ['./warehouse-file-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarehouseFileItemComponent implements OnInit {
  selected = true;

  constructor() { }

  ngOnInit(): void {
  }

}
