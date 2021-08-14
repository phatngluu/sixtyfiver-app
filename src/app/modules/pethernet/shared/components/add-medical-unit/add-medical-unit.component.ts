import { Web3Service } from './../../services/web3.service';
import { MedicalUnit } from './../../models/medical-unit';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sf-add-medical-unit',
  templateUrl: './add-medical-unit.component.html',
  styleUrls: ['./add-medical-unit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMedicalUnitComponent implements OnInit {

  validateForm: FormGroup;
  isSubmitting: boolean;
  public metamaskAccount: string;

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private ref: ChangeDetectorRef) {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]],
      medCode: [null, [Validators.required]],
      contact: [null, [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.web3Service.initialize();
    this.metamaskAccount = this.web3Service.connectedAccounts[0];
    this.ref.markForCheck();

    this.web3Service.accountChangedEvent.subscribe(() => {
      this.metamaskAccount = this.web3Service.connectedAccounts[0];
      this.ref.markForCheck();
    });
  }

  public connectWithMetaMask() {
    this.web3Service.connectMetamask();
  }

  public async submitForm(medicalUnit: MedicalUnit): Promise<void> {

  }

}
