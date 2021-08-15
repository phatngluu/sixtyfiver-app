import { EventEmitter } from '@angular/core';
export interface AbstractResponse<T> {
  /**
   * True or false. Return by server.
   *
   * @type {boolean}
   * @memberof AbstractResponse
   */
  success: boolean,
  /**
   * Server returns message.
   */
  message: T,
}

export interface AbstractEvent<T> {
  /**
   * Define the event to be emitted by ResponseHandler.
   *
   * @type {EventEmitter<T>}
   * @memberof AbstractEvent
   */
  eventEmitter: EventEmitter<T>,
  /**
   * Specify whether the event emits with a value or not.
   *
   * @type {boolean}
   * @memberof AbstractEvent
   */
  emptyValue?: boolean,
}

export interface AbstractResponseHandling<T> {
  /**
   * [User-defined] Handler use this event to emit changes.
   * Define then, subscribe to this event to do things.
   *
   * @type {AbstractEvent<T>}
   * @memberof AbstractResponseHandling
   */
  event?: AbstractEvent<T>,
  /**
   * Services must assign this value when Http operation returns.
   * Example: InjectorService.addInjector.
   * This will be handled by the ResponseHandler.
   *
   * @type {AbstractResponse<T>}
   * @memberof AbstractResponseHandling
   */
  response?: AbstractResponse<T>,

  /**
   * Services must assign this value when Contract operation returns.
   * Example: VaccineDoseService.addVaccineDose.
   * This will be handled by the ResponseHandler.
   *
   * @type {*}
   * @memberof AbstractResponseHandling
   */
  reciept?: any,

  /**
   * [User-defined] Set message to be shown when success.
   *
   * @type {string}
   * @memberof AbstractResponseHandling
   */
  successMessage?: string,

  /**
   * [User-defined] Set message to be shown when fail.
   *
   * @type {string}
   * @memberof AbstractResponseHandling
   */
  failMessage?: string,

  /**
   * Service must set this value when error is catched.
   * This will be handled by the ResponseHandler.
   *
   * @type {*}
   * @memberof AbstractResponseHandling
   */
  err?: any,

  /**
   * [User-defined] Define callback, that passes from caller.
   * Example: AddVaccineDoseComponent.submitForm()
   *
   * @memberof AbstractResponseHandling
   */
  callback?: (response?: AbstractResponse<T>, err?: any) => void,

  /**
   * Set to true if we need to prioritize performance.
   *
   * @type {boolean}
   * @memberof AbstractResponseHandling
   */
  turnOnMessage?: boolean
}
