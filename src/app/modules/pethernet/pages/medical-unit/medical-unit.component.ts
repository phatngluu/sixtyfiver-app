import { MedicalUnitService } from './../../shared/services/medical-unit.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MedicalUnit } from '../../shared/models/medical-unit';
import { AbstractResponseHandling, AbstractResponse } from '../../shared/models/abstract-response';

@Component({
  templateUrl: './medical-unit.component.html',
  styleUrls: ['./medical-unit.component.css']
})
export class MedicalUnitComponent implements OnInit {

  public role = {
    Admin: 'Admin',
    User: 'User',
    MinistryOfHealth: 'MinistryOfHealth',
    MedicalUnit: 'MedicalUnit',
    Doctor: 'Doctor',
    Injector: 'Injector',
  };
  public medicalUnit: MedicalUnit;


  constructor(
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private medicalUnitService: MedicalUnitService,
  ) { }

  async ngOnInit() {
    const responseHandling2: AbstractResponseHandling<MedicalUnit> = {
      callback: (result: AbstractResponse<MedicalUnit>) => {
        this.medicalUnit = result.message;
        this.ref.markForCheck();
      }
    }

    await this.medicalUnitService.getAuthorizedMedicalUnit(responseHandling2);
  }

  notRole(role: string) {
    return this.authService.userCredential.role !== role;
  }
}
