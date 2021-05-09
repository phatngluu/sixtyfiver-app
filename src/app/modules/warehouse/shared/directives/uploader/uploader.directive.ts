import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[sfUploader]'
})
export class UploaderDirective {

  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '0';

  //Dragover listener, when something is dragged over our host element
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    console.log('dragover');

    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  };

  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    console.log('dragleave');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff'
    this.opacity = '0'
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    console.log('drop');
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '0'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }


  constructor() { }

}
