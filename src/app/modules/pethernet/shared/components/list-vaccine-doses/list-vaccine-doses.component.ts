import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sf-list-vaccine-doses',
  templateUrl: './list-vaccine-doses.component.html',
  styleUrls: ['./list-vaccine-doses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListVaccineDosesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
