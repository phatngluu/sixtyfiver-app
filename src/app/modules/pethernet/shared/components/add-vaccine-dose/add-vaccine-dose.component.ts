import { AbstractResponseHandling } from './../../models/abstract-response';
import { Web3Service } from './../../services/web3.service';
import { VaccineDose } from './../../models/vaccine-dose';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaccinedosesService } from '../../services/vaccinedoses.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'sf-add-vaccine-dose',
  templateUrl: './add-vaccine-dose.component.html',
  styleUrls: ['./add-vaccine-dose.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVaccineDoseComponent implements OnInit {

  validateForm: FormGroup;
  isSubmitting: boolean;
  warnNoConnectedAccount: boolean = true;
  connectedMetamaskAccount: string;
  ministryOfHealthAccountAddress: string;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private web3Service: Web3Service,
    private vaccineDoseService: VaccinedosesService) {
    this.warnNoConnectedAccount = true;

    this.validateForm = this.fb.group({
      doseId: ['', [Validators.required]],
      lotNo: ['', [Validators.required]],
      vaccineName: ['', [Validators.required]],
      importedDate: [new Date(), [Validators.required]],
      expiredDate: [null, [Validators.required]]
    });
  }

  async ngOnInit() {
    await this.web3Service.initialize();

    const connectedAccounts = await this.web3Service.getConnectedAccounts();
    if (connectedAccounts.length === 0) {
      this.warnNoConnectedAccount = true;
    } else {
      this.warnNoConnectedAccount = false;
      this.connectedMetamaskAccount = connectedAccounts[0];
    }
    this.ministryOfHealthAccountAddress = await this.web3Service.loadMinistryOfHealthAccountAddress();
    this.ref.markForCheck();

    this.web3Service.accountChangedEvent.subscribe(async x => {
      const connectedAccounts = await this.web3Service.getConnectedAccounts();

      if (connectedAccounts.length === 0) {
        this.warnNoConnectedAccount = true;
      } else {
        this.warnNoConnectedAccount = false;
        this.connectedMetamaskAccount = connectedAccounts[0];
      }
      this.ref.markForCheck();
    });
  }

  async submitForm(vaccineDose: VaccineDose): Promise<void> {
    this.isSubmitting = true;

    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    const responseHandling: AbstractResponseHandling<Object> = {
      successMessage: 'Vaccine dose is add.',
      failMessage: 'Vaccine dose is not add.',
      callback: () => {
        this.isSubmitting = false;
        this.ref.markForCheck();
      },
      turnOnMessage: true
    }

    await this.vaccineDoseService.addVaccineDose(vaccineDose, responseHandling);
  }

  // resetForm(e: MouseEvent): void {
  //   e.preventDefault();
  //   this.validateForm.reset();
  //   for (const key in this.validateForm.controls) {
  //     if (this.validateForm.controls.hasOwnProperty(key)) {
  //       this.validateForm.controls[key].markAsPristine();
  //       this.validateForm.controls[key].updateValueAndValidity();
  //     }
  //   }
  // }

  // validateExpiredDate(): void {
  //   setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  // }

  // userNameAsyncValidator = (control: FormControl) =>
  //   new Observable((observer: Observer<ValidationErrors | null>) => {
  //     setTimeout(() => {
  //       if (control.value === 'JasonWood') {
  //         // you have to return `{error: true}` to mark it as an error event
  //         observer.next({ error: true, duplicated: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });

  // validateExpiredDate = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { error: true, required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // }
}
