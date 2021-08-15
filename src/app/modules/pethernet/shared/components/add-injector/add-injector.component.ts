import { ValidationService } from './../../services/validation.service';
import { Injector } from './../../models/injector';
import { InjectorService } from './../../services/injector.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractEvent, AbstractResponseHandling } from '../../models/abstract-response';

@Component({
  selector: 'sf-add-injector',
  templateUrl: './add-injector.component.html',
  styleUrls: ['./add-injector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInjectorComponent implements OnInit {

  validateForm: FormGroup;
  isSubmitting: boolean;
  birthdayPlaceholder: Date;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private injectorService: InjectorService) {
    const birthdayPlaceholder = new Date();
    birthdayPlaceholder.setFullYear(birthdayPlaceholder.getFullYear() - 18);

    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      birthday: [birthdayPlaceholder, [Validators.required]],
      citizenId: [null, [Validators.required], [ValidationService.injectorCitizenIdValidator(injectorService)]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public async submitForm(injector: Injector): Promise<void> {
    this.isSubmitting = true;

    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    const event: AbstractEvent<string> = {
      eventEmitter: this.injectorService.injectorAddedEvent,
      emptyValue: true,
    }

    const responseHandling: AbstractResponseHandling<Object> = {
      event,
      successMessage: 'Injector has been added.',
      failMessage: 'Injector has not been added.',
      callback: () => {
        this.isSubmitting = false;
        this.ref.markForCheck();
      },
      turnOnMessage: true
    }

    await this.injectorService.addInjector(injector, responseHandling);
  }
}
