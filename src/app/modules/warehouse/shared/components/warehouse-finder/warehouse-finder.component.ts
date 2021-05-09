import { Component, TemplateRef, Input, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FileModel } from '../../models/file-model';
import { WarehouseService } from '../../services/warehouse.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

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
              resolve(1);
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
        let fileInfo = this.fetchedFiles.filter(file => file.fileid === fileid)[0];
        this.warehouseService.downloadFile(fileid).toPromise()
          .then(
            (fileBlob) => {
              fileBlob = new Blob([fileBlob], {type: fileInfo.type});
              const objectUrl = window.URL.createObjectURL(fileBlob);
              let downloadLink = document.createElement('a');
              downloadLink.href = objectUrl;
              downloadLink.download = fileInfo.name;
              downloadLink.click();
              downloadLink.remove();
              this.message.create('success', `Downloaded ${fileInfo.name}`);
            },
            () => {
              this.message.create('error', `Failed to download ${fileInfo.name}`);
            }
          )
      });
    }
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`);
    }
  }
}
