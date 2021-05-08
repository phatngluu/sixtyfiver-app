import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-warehouse-uploader',
  templateUrl: './warehouse-uploader.component.html',
  styleUrls: ['./warehouse-uploader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarehouseUploaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
