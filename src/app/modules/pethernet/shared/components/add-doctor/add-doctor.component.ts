import { ValidationService } from './../../services/validation.service';
import { DoctorService } from './../../services/doctor.service';
import { Doctor } from './../../models/doctor';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AbstractEvent, AbstractResponseHandling } from '../../models/abstract-response';

@Component({
  selector: 'sf-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDoctorComponent implements OnInit {

  validateForm: FormGroup;
  isSubmitting: boolean;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private doctorService: DoctorService) {
    this.validateForm = this.fb.group({
      fullName: ['', [Validators.required]],
      citizenId: ['', [Validators.required], [ValidationService.doctorCitizenIdValidator(doctorService)]],
    });
  }

  ngOnInit(): void {
  }

  public async submitForm(doctor: Doctor): Promise<void> {
    this.isSubmitting = true;

    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    const event: AbstractEvent<string> = {
      eventEmitter: this.doctorService.doctorAddedEvent,
      emptyValue: true,
    }

    const responseHandling: AbstractResponseHandling<Object> = {
      event,
      successMessage: 'Doctor has been added.',
      failMessage: 'Doctor has not been added.',
      callback: () => {
        this.isSubmitting = false;
        this.ref.markForCheck();
      }
    }

    await this.doctorService.addDoctor(doctor, responseHandling);
  }
}
