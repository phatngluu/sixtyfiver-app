import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-vaccine-doses-list',
  templateUrl: './vaccine-doses-list.component.html',
  styleUrls: ['./vaccine-doses-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VaccineDosesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
