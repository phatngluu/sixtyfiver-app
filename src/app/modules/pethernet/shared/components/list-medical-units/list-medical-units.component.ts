import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-list-medical-units',
  templateUrl: './list-medical-units.component.html',
  styleUrls: ['./list-medical-units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMedicalUnitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
