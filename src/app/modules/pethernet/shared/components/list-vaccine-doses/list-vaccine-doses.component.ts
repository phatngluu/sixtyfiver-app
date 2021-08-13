import { Web3Service } from './../../services/web3.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VaccinedosesService } from '../../services/vaccinedoses.service';

@Component({
  selector: 'sf-list-vaccine-doses',
  templateUrl: './list-vaccine-doses.component.html',
  styleUrls: ['./list-vaccine-doses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListVaccineDosesComponent implements OnInit {

  public vaccineDosesList: string[];

  constructor(
    private ref: ChangeDetectorRef,
    private vaccineDosesService: VaccinedosesService) {
    this.vaccineDosesService;
  }

  async ngOnInit(): Promise<void> {
    const callback = (result: string[]) => {
      this.vaccineDosesList = result;
      this.ref.markForCheck();
    };

    await this.vaccineDosesService.getVaccineDoses(callback);
  }

}
