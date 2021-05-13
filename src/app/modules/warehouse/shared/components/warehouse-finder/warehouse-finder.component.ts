import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { FileModel } from '../../models/file-model';
import { WarehouseService } from '../../services/warehouse.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'sf-warehouse-finder',
  templateUrl: './warehouse-finder.component.html',
  styleUrls: ['./warehouse-finder.component.css']
})
export class WarehouseFinderComponent implements OnInit {
  @Input() fetchedFiles: FileModel[];
  checked = false;
  indeterminate = false;
  listOfData: ReadonlyArray<FileModel> = [];
  listOfCurrentPageData: ReadonlyArray<FileModel> = [];
  setOfCheckedId = new Set<string>();
  @Output() setOfCheckedIdSender = new EventEmitter();

  constructor(
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit(): void {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
    })
  }

  updateCheckedSet(fileid: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(fileid);
    } else {
      this.setOfCheckedId.delete(fileid);
    }
    this.setOfCheckedIdSender.emit(this.setOfCheckedId);
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<FileModel>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ fileid }) => this.setOfCheckedId.has(fileid));
    this.indeterminate = this.listOfCurrentPageData.some(({ fileid }) => this.setOfCheckedId.has(fileid)) && !this.checked;
  }


  onItemChecked(fileid: string, checked: boolean): void {
    this.updateCheckedSet(fileid, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ fileid }) => this.updateCheckedSet(fileid, checked));
    this.refreshCheckedStatus();
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
