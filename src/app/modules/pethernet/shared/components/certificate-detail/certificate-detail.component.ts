import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractResponse, AbstractResponseHandling } from '../../models/abstract-response';
import { Certificate } from '../../models/certificate';
import { MedicalUnit } from '../../models/medical-unit';
import { MedicalUnitService } from '../../services/medical-unit.service';

@Component({
  selector: 'sf-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificateDetailComponent implements OnInit {

  @Input() certificate: Certificate;
  medicalUnit: MedicalUnit;

  constructor(
    private ref: ChangeDetectorRef,
    private medicalUnitService: MedicalUnitService) { }

  ngOnInit(): void {
    const responseHandling3: AbstractResponseHandling<MedicalUnit> = {
      callback: (result: AbstractResponse<MedicalUnit>) => {
        this.medicalUnit = result.message;
        this.ref.markForCheck();
      }
    }

    this.medicalUnitService.getMedicalUnitDetails(this.certificate.medicalUnitHash, responseHandling3);
  }

}
