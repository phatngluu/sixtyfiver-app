import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FinderOffset } from '../../models/finder-offset';

@Component({
  selector: 'sf-warehouse-uploader',
  templateUrl: './warehouse-uploader.component.html',
  styleUrls: ['./warehouse-uploader.component.css']
})
export class WarehouseUploaderComponent implements OnInit, OnChanges {
  @Input() finderOffset: FinderOffset;
  offsetTop = '0px';
  offsetLeft = '0px';
  offsetWidth = '0px';
  offsetHeight = '0px';

  @ViewChild('uploadContainer', { read: ElementRef, static: false }) warehouseFinder: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.finderOffset && this.warehouseFinder){
      let offsets = changes.finderOffset.currentValue;
      this.offsetTop = offsets.offsetTop + 'px'
      this.offsetLeft = offsets.offsetLeft + 'px'
      this.offsetWidth = offsets.offsetWidth + 'px'
      this.offsetHeight = offsets.offsetHeight + 'px'
    };
  }

  uploadFile(evt){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    // File can now be uploaded by doing an http post with the payload
  }
}
