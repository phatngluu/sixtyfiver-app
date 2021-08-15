import { AbstractResponse, AbstractResponseHandling } from './../../models/abstract-response';
import { MedicalUnitService } from './../../services/medical-unit.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalUnit } from '../../models/medical-unit';
import { VaccineDose } from '../../models/vaccine-dose';
import { VaccinedosesService } from '../../services/vaccinedoses.service';

@Component({
  selector: 'sf-distribute-vaccine-dose',
  templateUrl: './distribute-vaccine-dose.component.html',
  styleUrls: ['./distribute-vaccine-dose.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributeVaccineDoseComponent implements OnInit {

  public medicalUnitHash: string;
  public medUnit: MedicalUnit;
  public medicalUnits: MedicalUnit[];

  public vaccineDosesList: string[];
  public availableVaccineDoses: VaccineDose[];
  public selectedVaccineName: string;
  public selectedLotNo: string;
  public vaccineNames: string[];
  public lotCategory: string[];
  public filteredVaccineDoses: VaccineDose[];
  public numberOfSelectedVaccines: number;
  public isSubmitting: boolean;
  public progressProzent: number = 0;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private medicalUnitService: MedicalUnitService,
    private vaccineDosesService: VaccinedosesService,
  ) {
    this.vaccineNames = [];
  }

  async ngOnInit() {
    const resHandling: AbstractResponseHandling<VaccineDose[]> = {
      callback: (resp: AbstractResponse<VaccineDose[]>) => {
        const today = new Date();
        resp.message = resp.message.filter(x => new Date(x.expiredDate) > today); // filter expired vaccine
        this.availableVaccineDoses = resp.message;

        this.vaccineNames = [... new Set(resp.message.map(x => x.vaccineName))];
        this.lotCategory = [... new Set(resp.message.map(x => x.lotNo))];

        this.ref.markForCheck();
      }
    };

    await this.vaccineDosesService.getVaccineDoses(resHandling);

    const responseHandling: AbstractResponseHandling<MedicalUnit[]> = {
      successMessage: 'Loaded medical units.',
      failMessage: 'Cannot load medical units.',
      callback: (result: AbstractResponse<MedicalUnit[]>) => {
        this.medicalUnits = result.message;
        this.ref.markForCheck();
      },
      turnOnMessage: true,
    };
    await this.medicalUnitService.getVerifiedMedicalUnits(responseHandling);


    this.activatedRoute.params.subscribe(params => {
      this.medicalUnitHash = params['medicalUnitHash'];

      if (this.medicalUnitHash !== undefined) {
        this.onSelectedMedicalUnitChanged();
        this.ref.markForCheck();
      }
    });
  }

  async onSelectedMedicalUnitChanged() {
    this.router.navigateByUrl('/pethernet/vaccinedoses/distribute/' + this.medicalUnitHash)

    const responseHandling: AbstractResponseHandling<MedicalUnit> = {
      callback: (result: AbstractResponse<MedicalUnit>) => {
        if (result.message !== null) {
          this.medUnit = result.message;
          this.ref.detectChanges();
        } else {
          this.router.navigateByUrl('/pethernet/vaccinedoses/distribute');
        }
      },
    };

    this.medicalUnitService.getMedicalUnitDetails(this.medicalUnitHash, responseHandling);
  }

  onSelectedVaccineNameChanged() {
    if (this.selectedVaccineName && this.selectedVaccineName !== '') {
      const lotCat = this.availableVaccineDoses.filter(x => x.vaccineName === this.selectedVaccineName).map(x => x.lotNo);
      this.lotCategory = [... new Set(lotCat)];
    } else {
      this.selectedLotNo = null;
      this.lotCategory = [];
    }
    this.ref.markForCheck();
  }

  onLotNoChanged() {
    if (this.selectedLotNo && this.selectedLotNo !== '') {
      this.filteredVaccineDoses = this.availableVaccineDoses
        .filter(x => x.vaccineName == this.selectedVaccineName && x.lotNo === this.selectedLotNo);
    } else {
      this.numberOfSelectedVaccines = null;
      this.filteredVaccineDoses = [];
    }
    this.ref.markForCheck();
  }

  async distributeVaccine() {
    this.isSubmitting = true;
    console.log(this.filteredVaccineDoses);

    for (let index = 0; index < this.numberOfSelectedVaccines; index++) {
      const vaccineDose = this.filteredVaccineDoses[index];

      const responseHandling: AbstractResponseHandling<Object> = {
        failMessage: `Cannot distribute vaccine with dose identity${vaccineDose.doseId}`,
        callback: () => {
          this.isSubmitting = false;
          this.ref.markForCheck();
        },
        turnOnMessage: true
      }

      await this.vaccineDosesService.distributeVaccineDose(vaccineDose.hash, this.medicalUnitHash, responseHandling);

      this.progressProzent = (index + 1) / this.numberOfSelectedVaccines * 100;
      this.ref.markForCheck();
    }
  }
}
