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
import { FinderOffset } from './shared/models/finder-offset';

@Component({
  selector: 'sf-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class WarehouseComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public finderOffset: FinderOffset;

  @ViewChild('warehouseFinder', { read: ElementRef, static: false }) warehouseFinder: ElementRef;

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


  constructor(private cdref: ChangeDetectorRef) {}
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

  ngOnInit(): void {}

  ngOnDestroy() {}
}
