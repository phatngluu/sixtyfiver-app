import { VaccineDose } from './../../models/vaccine-dose';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { VaccinedosesService } from '../../services/vaccinedoses.service';

@Component({
  selector: 'sf-add-vaccine-dose',
  templateUrl: './add-vaccine-dose.component.html',
  styleUrls: ['./add-vaccine-dose.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVaccineDoseComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vaccineDoseService: VaccinedosesService) {
    this.validateForm = this.fb.group({
      doseId: ['', [Validators.required]],
      lotNo: ['', [Validators.required]],
      vaccineName: ['', [Validators.required]],
      importedDate: [new Date(), [Validators.required]],
      expiredDate: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submitForm(value: VaccineDose): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    console.log(789);


    this.vaccineDoseService.addVaccineDose(value);
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
