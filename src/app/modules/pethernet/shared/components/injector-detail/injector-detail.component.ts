import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Injector } from '../../models/injector';

@Component({
  selector: 'sf-injector-detail',
  templateUrl: './injector-detail.component.html',
  styleUrls: ['./injector-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectorDetailComponent implements OnInit {

  @Input() injector: Injector;

  constructor() { }

  ngOnInit(): void {
  }

}
