import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.base';
import { AbstractResponseHandling, AbstractResponse } from '../models/abstract-response';
import { MedicalUnit } from '../models/medical-unit';
import { RespondHandlerService } from './respond-handler.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalUnitService {

  private genericOptions: object = { responseType: "json" };

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service,
    private responseHandler: RespondHandlerService) {

  }

  public async addMedicalUnit(medicalUnit: MedicalUnit, responseHandling: AbstractResponseHandling<Object>) {
    try {
      const res = await this.http.post<AbstractResponse<Object>>(environment.addMedicalUnit, medicalUnit, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getVerifiedMedicalUnits(responseHandling: AbstractResponseHandling<MedicalUnit[]>) {
    try {
      const res = await this.http.get<AbstractResponse<MedicalUnit[]>>(environment.getVerifiedMedicalUnits, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (err) {
      responseHandling.err = err;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getUnverifiedMedicalUnits(responseHandling: AbstractResponseHandling<MedicalUnit[]>) {
    try {
      const res = await this.http.get<AbstractResponse<MedicalUnit[]>>(environment.getUnverifiedMedicalUnits, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (err) {
      responseHandling.err = err;
    }

    this.responseHandler.handle(responseHandling);
  }
}
