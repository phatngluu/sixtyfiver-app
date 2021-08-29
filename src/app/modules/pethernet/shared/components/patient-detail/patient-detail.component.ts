import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Injector } from '../../models/injector';

@Component({
  selector: 'sf-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: Injector;

  constructor() { }

  ngOnInit(): void {
  }

}
