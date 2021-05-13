import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[sfUploader]',
})
export class UploaderDirective {
  @Output() onFileDropped = new EventEmitter<any>();
  @Output() draggedLeaveUploader = new EventEmitter();
  @HostBinding('style.background-color') public background = '#195ad3';
  @HostBinding('style.opacity') public opacity = '0.8';

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.draggedLeaveUploader.emit();
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt) {
    console.log('drop at uploader');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '0';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

  constructor() {}
}
