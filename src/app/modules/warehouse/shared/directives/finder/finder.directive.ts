import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[sfFinder]',
})
export class FinderDirective {
  @Output() draggedOverFinder = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.draggedOverFinder.emit();
  }

  constructor() {}
}
