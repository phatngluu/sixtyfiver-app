import { AbstractResponseHandling } from './../models/abstract-response';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class RespondHandlerService {

  constructor(private messageService: NzMessageService) { }

  public handle(responseHandling: AbstractResponseHandling<any>) {
    if (responseHandling.callback) {
      responseHandling.callback(responseHandling.response);
    }

    const successMessage = responseHandling.successMessage ? responseHandling.successMessage : "Operation succeeded.";
    const failMessage = responseHandling.failMessage ? responseHandling.failMessage : "Operation failed.";

    if (responseHandling.err) {
      this.messageService.error(failMessage);
      console.error(responseHandling.err);
      return;
    }

    if (responseHandling.response?.success) {
      if (responseHandling.turnOnMessage === true) {
        this.messageService.success(successMessage)
      };
      if (responseHandling.event) {
        if (responseHandling.event.emptyValue === true) {
          responseHandling.event.eventEmitter.emit();
        } else {
          responseHandling.event.eventEmitter.emit(responseHandling.response.message);
        }
      }
    } else {
      this.messageService.error(failMessage);
    }

    this.contractReceiptHandling(responseHandling.reciept);
  }

  private contractReceiptHandling(receipt: any) {
    if (receipt) {
      console.info('---- Contract Reciept ----')
      console.info(receipt);
      console.info('---- Contract Reciept ----')
    }
  }
}
