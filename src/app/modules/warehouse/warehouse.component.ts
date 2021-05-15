import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { FileModel } from './shared/models/file-model';
import { FinderOffset } from './shared/models/finder-offset';
import { WarehouseService } from './shared/services/warehouse.service';

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public checked = false;
  public indeterminate = false;
  public fetchedFiles: FileModel[];
  public listOfCurrentPageData: FileModel[];
  public setOfCheckedId = new Set<string>();
  public finderOffset: FinderOffset;
  public showUploader = false;

  @ViewChild('warehouseContainer', { read: ElementRef, static: false }) warehouseWrapper: ElementRef;
  @HostListener('window:resize', ['$event']) onResize(event): void {
    const innerContentElement = this.warehouseWrapper.nativeElement;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    };
  }

  constructor(
    private warehouseService: WarehouseService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
    });
  }

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    const innerContentElement = this.warehouseWrapper.nativeElement;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    };
  }

  ngAfterViewInit(): void {
    const innerContentElement = this.warehouseWrapper.nativeElement;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    };
  }

  refetchFiles(): void {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
      this.setOfCheckedId = new Set<string>();
      this.refreshCheckedStatus();
    });
  }

  onItemChecked(event): void {
    this.updateCheckedSet(event.fileid, event.checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(event): void {
    this.listOfCurrentPageData.forEach(({ fileid }) => this.updateCheckedSet(fileid, event));
    this.refreshCheckedStatus();
  }

  onListOfCurrentPageDataChanges(listOfCurrentPageData): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  private updateCheckedSet(fileid: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(fileid);
    } else {
      this.setOfCheckedId.delete(fileid);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ fileid }) => this.setOfCheckedId.has(fileid));
    this.indeterminate = this.listOfCurrentPageData.some(({ fileid }) => this.setOfCheckedId.has(fileid)) && !this.checked;
  }

}
