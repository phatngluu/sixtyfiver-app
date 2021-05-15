import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileModel } from '../../models/file-model';

@Component({
  selector: 'sf-warehouse-finder',
  templateUrl: './warehouse-finder.component.html',
  styleUrls: ['./warehouse-finder.component.css']
})
export class WarehouseFinderComponent implements OnInit {
  @Input() fetchedFiles: FileModel[];
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() setOfCheckedId: Set<string>;

  @Output() listOfCurrentPageDataChanges = new EventEmitter();
  @Output() itemCheckedChanges = new EventEmitter();
  @Output() allItemCheckedChanges = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  // updateCheckedSet(fileid: string, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(fileid);
  //   } else {
  //     this.setOfCheckedId.delete(fileid);
  //   }
  //   this.setOfCheckedIdChanges.emit(this.setOfCheckedId);
  // }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<FileModel>): void {
    this.listOfCurrentPageDataChanges.emit(listOfCurrentPageData);
    // this.listOfCurrentPageData = listOfCurrentPageData;
    // this.refreshCheckedStatus();
  }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(({ fileid }) => this.setOfCheckedId.has(fileid));
  //   this.indeterminate = this.listOfCurrentPageData.some(({ fileid }) => this.setOfCheckedId.has(fileid)) && !this.checked;
  // }


  onItemChecked(fileid: string, checked: boolean): void {
    this.itemCheckedChanges.emit({ fileid, checked });
    // this.updateCheckedSet(fileid, checked);
    // this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.allItemCheckedChanges.emit(checked);
    // this.listOfCurrentPageData.forEach(({ fileid }) => this.updateCheckedSet(fileid, checked));
    // this.refreshCheckedStatus();
  }

  // handleChange({ file, fileList }: NzUploadChangeParam): void {
  //   const status = file.status;
  //   if (status !== 'uploading') {
  //     console.log(file, fileList);
  //   }
  //   if (status === 'done') {
  //     this.message.success(`${file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     this.message.error(`${file.name} file upload failed.`);
  //   }
  // }
}
