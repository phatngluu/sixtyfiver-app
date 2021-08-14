import hash from 'object-hash';
import { Injector } from './../models/injector';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.base';
import { AbstractResponseHandling, AbstractResponse } from '../models/abstract-response';
import { Doctor } from '../models/doctor';
import { RespondHandlerService } from './respond-handler.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class InjectorService {

  private genericOptions: object = { responseType: "json" };

  public injectorAddedEvent = new EventEmitter();

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service,
    private responseHandler: RespondHandlerService) {
  }

  public async addInjector(injector: Injector, responseHandling: AbstractResponseHandling<Object>) {
    try {
      const res = await this.http.post<AbstractResponse<Object>>(environment.addInjector, injector, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getInjectors(callback: (result: string[]) => void): Promise<void> {
    await this.web3Service.initialize();

    this.web3Service.contract.methods.injectorsListGetter().call()
      .then(result => callback(result));
  }

  public async checkInjectorExisted(citizenId: string): Promise<boolean> {
    const injectorHash = hash(citizenId);
    const url = `${environment.checkInjector}?hash=${injectorHash}`;

    const abstractRes = await this.http.get<AbstractResponse<boolean>>(url).toPromise();
    return abstractRes.message;
  }
}
