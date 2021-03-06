import { AuthService } from './../../../../../shared/services/auth.service';
import { AbstractResponse, AbstractResponseHandling } from '../../models/abstract-response';
import { MedicalUnitService } from '../../services/medical-unit.service';
import { Web3Service } from '../../services/web3.service';
import { MedicalUnit } from '../../models/medical-unit';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sf-register-medical-unit',
  templateUrl: './register-medical-unit.component.html',
  styleUrls: ['./register-medical-unit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMedicalUnitComponent implements OnInit {

  validateForm: FormGroup;
  isSubmitting: boolean;
  public metamaskAccount: string;
  public registeredSuccessfuly: boolean = false;
  public medicalUnit: MedicalUnit;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private web3Service: Web3Service,
    private medicalUnitService: MedicalUnitService) {
    this.validateForm = this.fb.group({
      medCode: [null, [Validators.required]],
      medName: [null, [Validators.required]],
      accountAddress: [null, [Validators.required]],
      physicalAddress: [null, Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.web3Service.initialize();
    const accounts = await this.web3Service.getConnectedAccounts();
    this.metamaskAccount = accounts[0];
    console.log(this.metamaskAccount);

    this.validateForm.get('accountAddress').setValue(this.metamaskAccount);
    this.ref.markForCheck();

    const responseHandling2: AbstractResponseHandling<MedicalUnit> = {
      callback: (result: AbstractResponse<MedicalUnit>) => {
        this.medicalUnit = result.message;
        this.ref.markForCheck();
      }
    }

    await this.medicalUnitService.getAuthorizedMedicalUnit(responseHandling2);

    this.web3Service.accountChangedEvent.subscribe(() => {
      this.metamaskAccount = this.web3Service.connectedAccounts[0];
      this.validateForm.get('accountAddress').setValue(this.metamaskAccount);
      this.ref.markForCheck();
    });
  }

  public connectWithMetaMask() {
    this.web3Service.connectMetamask();
  }

  public async submitForm(medicalUnit: MedicalUnit): Promise<void> {
    medicalUnit.userId = this.authService.userCredential.sub;

    const responseHandling: AbstractResponseHandling<Object> = {
      successMessage: 'Medical unit registration has been sent.',
      failMessage: 'Medical unit registration has not been sent.',
      // turnOnMessage: true,
      callback: () => {
        this.registeredSuccessfuly = true;
        this.ref.markForCheck();
      }
    };

    await this.medicalUnitService.addMedicalUnit(medicalUnit, responseHandling);
  }
}
