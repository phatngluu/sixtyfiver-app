import { MedicalUnit } from './../../models/medical-unit';
import { Web3Service } from './../../services/web3.service';
import hash from 'object-hash';
import { Certificate } from './../../models/certificate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractResponse, AbstractResponseHandling } from './../../models/abstract-response';
import { MedicalUnitService } from './../../services/medical-unit.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VaccineDose } from '../../models/vaccine-dose';

@Component({
  selector: 'sf-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueCertificateComponent implements OnInit {

  public validateForm: FormGroup;

  public medicalUnitHash: string;
  public medicalUnit: MedicalUnit;
  public doctorHash: string = '6931764dbffb80a816c84d35362f38143f6c1961';
  public availableVaccineDoses: VaccineDose[];
  isSubmitting: boolean;
  warnNoConnectedAccount: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private medicalUnitService: MedicalUnitService,
  ) {
    this.validateForm = this.fb.group({
      medicalUnitHash: [this.medicalUnitHash, [Validators.required]],
      injectorCitizenId: ['', [Validators.required]],
      doctorHash: [this.doctorHash, [Validators.required]],
      vaccineDoseHash: ['', [Validators.required]],
    });
  }

  async ngOnInit(){
    await this.web3Service.initialize();
    (await this.web3Service.getConnectedAccounts()).length
    if ((await this.web3Service.getConnectedAccounts()).length === 0) {
      this.warnNoConnectedAccount = true;
      this.ref.markForCheck();
    }

    this.web3Service.accountChangedEvent.subscribe(x => {
      if (this.web3Service.connectedAccounts.length === 0) {
        this.warnNoConnectedAccount = true;
      } else {
        this.warnNoConnectedAccount = false;
      }
      this.ref.markForCheck();
    });

    const responseHandling: AbstractResponseHandling<VaccineDose[]> = {
      callback: (result: AbstractResponse<VaccineDose[]>) => {
        this.availableVaccineDoses = result.message;
        this.ref.markForCheck();
      }
    }

    const responseHandling2: AbstractResponseHandling<MedicalUnit> = {
      callback: (result: AbstractResponse<MedicalUnit>) => {
        this.medicalUnit = result.message;
        this.medicalUnitHash = this.medicalUnit.hash;
        this.ref.markForCheck();
      }
    }

    await this.medicalUnitService.getAuthorizedMedicalUnit(responseHandling2);

    await this.medicalUnitService.getAvailableVaccineDoses(this.medicalUnitHash, responseHandling);
  }

  public async submitForm(cert: Certificate) {
    this.isSubmitting = true;
    cert.injectorHash = hash(cert.injectorCitizenId);

    const responseHandling : AbstractResponseHandling<Certificate> = {
      callback: (result: AbstractResponse<Certificate>) => {
        this.isSubmitting = false;
        this.ref.markForCheck();
      }
    }

    await this.medicalUnitService.issueCertificate(cert, responseHandling);
  }
}
