import { EventEmitter } from '@angular/core';
export interface AbstractResponse<T> {
  success: boolean,
  message: T,
}

export interface AbstractEvent<T> {
  eventEmitter: EventEmitter<T>,
  emptyValue?: boolean,
}

export interface AbstractResponseHandling<T> {
  event?: AbstractEvent<T>,
  response?: AbstractResponse<T>, // for http operation
  reciept?: any, // for contract operation
  successMessage?: string, // success msg
  failMessage?: string, // fail msg
  err?: any, // err if any
  callback?: (response?: AbstractResponse<T>, err?: any) => void // define callback, that passes from caller
}
