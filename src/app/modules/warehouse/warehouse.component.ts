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
import { Router } from '@angular/router';
import { FileModel } from './shared/models/file-model';
import { FinderOffset } from './shared/models/finder-offset';
import { WarehouseService } from './shared/services/warehouse.service';

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class WarehouseComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public fetchedFiles: FileModel[];
  public finderOffset: FinderOffset;
  public showUploader: boolean = false;
  public setOfCheckedId: Set<string>;

  @ViewChild('warehouseContainer', { read: ElementRef, static: false }) warehouseFinder: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let innerContentElement = this.warehouseFinder.nativeElement.parentNode.parentNode;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    }
  }

  constructor(
    private warehouseService: WarehouseService,
    private cdref : ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
    })
  }

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    let innerContentElement = this.warehouseFinder.nativeElement.parentNode.parentNode;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    }
  }

  ngAfterViewInit(): void {
    let innerContentElement = this.warehouseFinder.nativeElement.parentNode.parentNode;
    this.finderOffset = {
      offsetTop: innerContentElement.offsetTop,
      offsetLeft: innerContentElement.offsetLeft,
      offsetWidth: innerContentElement.offsetWidth,
      offsetHeight: innerContentElement.offsetHeight,
    }
  }

  ngOnDestroy() {}

  updateSetOfCheckedId(setOfCheckedId) {
    this.setOfCheckedId = setOfCheckedId;
  }

  refetchFiles() {
    this.warehouseService.getAllFiles().subscribe((data) => {
      this.fetchedFiles = data;
    })
  }
}
