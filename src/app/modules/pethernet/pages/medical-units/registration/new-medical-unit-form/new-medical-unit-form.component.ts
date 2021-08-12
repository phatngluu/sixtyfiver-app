import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-new-medical-unit-form',
  templateUrl: './new-medical-unit-form.component.html',
  styleUrls: ['./new-medical-unit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMedicalUnitFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
