import { DoctorService } from './../../services/doctor.service';
import { Doctor } from './../../models/doctor';
import { RespondHandlerService } from './../../services/respond-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Web3Service } from './../../services/web3.service';
import { VaccineDose } from './../../models/vaccine-dose';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaccinedosesService } from '../../services/vaccinedoses.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractEvent, AbstractResponse, AbstractResponseHandling } from '../../models/abstract-response';

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
    private doctorService: DoctorService,
    private responseHandler: RespondHandlerService) {
    this.validateForm = this.fb.group({
      fullName: ['', [Validators.required]],
      citizenId: ['', [Validators.required]],
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
