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

  uploadFile(evt){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    // File can now be uploaded by doing an http post with the payload
  }
}
