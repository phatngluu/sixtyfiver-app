import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-add-injector',
  templateUrl: './add-injector.component.html',
  styleUrls: ['./add-injector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInjectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
