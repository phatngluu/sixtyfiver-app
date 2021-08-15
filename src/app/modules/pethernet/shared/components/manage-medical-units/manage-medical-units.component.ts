import { AbstractResponse } from '../../models/abstract-response';
import { MedicalUnitService } from '../../services/medical-unit.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { AbstractResponseHandling } from '../../models/abstract-response';
import { MedicalUnit } from '../../models/medical-unit';

@Component({
  selector: 'sf-manage-medical-units',
  templateUrl: './manage-medical-units.component.html',
  styleUrls: ['./manage-medical-units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageMedicalUnitsComponent implements OnInit {

  public verifiedMedUnits: MedicalUnit[];
  public unverifiedMedUnits: MedicalUnit[];
  public isLoading = true;
  @Input() viewType: string;

  panels = [
    {
      active: true,
      name: 'Unverified Medical Unit',
      key: 'Unverified'
    },
    {
      active: false,
      name: 'Verified Medical Unit',
      key: 'Verified'
    }
  ];


  constructor(
    private ref: ChangeDetectorRef,
    private medicalUnitService: MedicalUnitService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getVerifiedMedicalUnits();
    await this.getUnverifiedMedicalUnits();
    this.isLoading = false;
    this.ref.markForCheck();
  }

  private async getVerifiedMedicalUnits() {
    const responseHandling: AbstractResponseHandling<MedicalUnit[]> = {
      successMessage: 'Fetched medical units.',
      failMessage: 'Cannot fetch medical units.',
      callback: (response: AbstractResponse<MedicalUnit[]>) => {
        this.verifiedMedUnits = response.message;
        this.ref.markForCheck();
      },
    };

    await this.medicalUnitService.getVerifiedMedicalUnits(responseHandling);
  }

  private async getUnverifiedMedicalUnits() {
    const responseHandling: AbstractResponseHandling<MedicalUnit[]> = {
      successMessage: 'Fetched medical units.',
      failMessage: 'Cannot fetch medical units.',
      callback: (response: AbstractResponse<MedicalUnit[]>) => {
        this.unverifiedMedUnits = response.message;
        this.ref.markForCheck();
      },
    };

    await this.medicalUnitService.getUnverifiedMedicalUnits(responseHandling);
  }
}
