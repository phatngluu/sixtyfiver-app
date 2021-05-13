import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WarehouseService } from '../../services/warehouse.service';
import { FileModel } from '../../models/file-model';

@Component({
  selector: 'sf-warehouse-finder-toolbar',
  templateUrl: './warehouse-finder-toolbar.component.html',
  styleUrls: ['./warehouse-finder-toolbar.component.css'],
})
export class WarehouseFinderToolbarComponent implements OnInit {
  @Input() fetchedFiles: FileModel[];
  @Input() setOfCheckedId: Set<string>;
  @Output() refetchFilesNeeded = new EventEmitter();

  constructor(
    private warehouseService: WarehouseService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  private

  private onDeleteFiles(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.setOfCheckedId.size > 0){
        let selectedFileIds = Array.from(this.setOfCheckedId);
        Promise.all(selectedFileIds.map(fileid => this.warehouseService.deleteFile(fileid).toPromise()))
          .then(
            () => {
              // this.warehouseService.getAllFiles().subscribe((data) => {
              //   this.fetchedFiles = data;
              // });
              this.refetchFilesNeeded.emit('');
              resolve(1);
              this.message.create('success', `Files deleted`);
            },
            () => {
              this.message.create('error', `Failed to delete`);
            }
          )
          .catch(() => {
            reject(0)
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

}
