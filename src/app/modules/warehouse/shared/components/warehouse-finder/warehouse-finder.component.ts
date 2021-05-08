import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from '../../models/file-model';
import { WarehouseService } from '../../service/warehouse.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-warehouse-finder',
  templateUrl: './warehouse-finder.component.html',
  styleUrls: ['./warehouse-finder.component.css']
})
export class WarehouseFinderComponent implements OnInit {
  fetchedFiles: FileModel[];
  checked = false;
  indeterminate = false;
  listOfData: ReadonlyArray<FileModel> = [];
  listOfCurrentPageData: ReadonlyArray<FileModel> = [];
  setOfCheckedId = new Set<string>();

  constructor(
    private warehouseService: WarehouseService,
    private modal: NzModalService,
    private message: NzMessageService
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

  private onDeleteFiles(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.setOfCheckedId.size > 0){
        let selectedFileIds = Array.from(this.setOfCheckedId);
        Promise.all(selectedFileIds.map(fileid => this.warehouseService.deleteFile(fileid).toPromise()))
          .then(
            () => {
              this.warehouseService.getAllFiles().subscribe((data) => {
                this.fetchedFiles = data;
              });
              this.message.create('success', `Files deleted`);
            },
            () => {
              this.message.create('error', `Failed to delete`);
            }
          )
          .catch(() => {
            // display error
            console.log('error occurred!')
          });
        this.setOfCheckedId = new Set<string>();
      }
    })

  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete these files?',
      nzContent: this.warehouseService.getSelectedFileNames(this.setOfCheckedId, this.fetchedFiles),
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteFiles(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  onDownloadFiles() {
    if (this.setOfCheckedId.size > 0){
      this.setOfCheckedId.forEach(fileid => {
        this.warehouseService.downloadFile(fileid).toPromise()
          .then(
            () => {
              this.message.create('success', `Downloaded ${fileid}`);
            },
            () => {
              this.message.create('error', `Failed to download ${fileid}`);
            }
          )
      });
    }
  }
}
