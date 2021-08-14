import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-list-injector',
  templateUrl: './list-injector.component.html',
  styleUrls: ['./list-injector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListInjectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
