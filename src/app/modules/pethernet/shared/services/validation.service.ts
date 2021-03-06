import { InjectorService } from './injector.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors, FormControl } from "@angular/forms";
import { Observer } from "rxjs";
import { Observable } from "rxjs";

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static injectorCitizenIdValidator(injectorService: InjectorService): AsyncValidatorFn {
    return (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
      const citizenId = control.value;
      injectorService.checkInjectorExisted(citizenId).then((isExisted) => {
        console.log(isExisted)
        if (isExisted === true) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch((err) => {
        console.error(err);
        observer.next({ error: true, notchecked: true })
        observer.complete();
      });
    });
  }

  static injectorCitizenIdExistenceValidator(injectorService: InjectorService): AsyncValidatorFn {
    return (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
      const citizenId = control.value;
      injectorService.checkInjectorExisted(citizenId).then((isExisted) => {
        if (isExisted === false) {
          observer.next({ error: true, unexisted: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch((err) => {
        console.error(err);
        observer.next({ error: true, notchecked: true })
        observer.complete();
      });
    });
  }


  // static citizenIdValidator = (control: FormControl) =>
  //   new Observable((observer: Observer<ValidationErrors | null>) => {
  //     const citizenId = control.value;
  //     this.injectorService.checkInjectorExisted(citizenId).then((isExisted) => {
  //       console.log(isExisted)
  //       if (isExisted === true) {
  //         observer.next({ error: true, duplicated: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }).catch((err) => {
  //       console.error(err);
  //       observer.next({ error: true, notchecked: true })
  //       observer.complete();
  //     });
  //   });
}
