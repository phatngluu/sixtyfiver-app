import { HostListener } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'sf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  @HostListener('dragover', ['$event'])
  onDrag(event) {
    event.preventDefault();
    event.stopPropagation();
  }

}
