import { AbstractResponse } from './../models/abstract-response';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class RespondHandlerService {

  constructor(private messageService: NzMessageService) { }

  public handle(response: AbstractResponse<any>, successMessage?: string, failMessage?: string) {
    successMessage = successMessage ? successMessage : "Operation succeeded.";
    failMessage = failMessage ? failMessage : "Operation failed.";

    if (response.success) {
      this.messageService.success(successMessage);
    } else {
      this.messageService.error(failMessage);
    }
  }

  public contractHandle(receipt: any, err?: any, successMessage?: string, failMessage?: string) {
    successMessage = successMessage ? successMessage : "Operation succeeded.";
    failMessage = failMessage ? failMessage : "Operation failed.";

    if (err) {
      this.messageService.error(failMessage);
      console.error(err);
    } else {
      this.messageService.success(successMessage);
    }
    // console.log(receipt);
  }
}
