import { GenericOptions } from './../../../../shared/models/generic-options';
import { AuthService } from 'src/app/shared/services/auth.service';
import hash from 'object-hash';
import { Certificate } from './../models/certificate';
import { MedicalUnit } from './../models/medical-unit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.base';
import { AbstractResponseHandling, AbstractResponse } from '../models/abstract-response';
import { RespondHandlerService } from './respond-handler.service';
import { Web3Service } from './web3.service';
import { VaccineDose } from '../models/vaccine-dose';

@Injectable({
  providedIn: 'root'
})
export class MedicalUnitService {

  private genericOptions: object;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private web3Service: Web3Service,
    private responseHandler: RespondHandlerService) {
    this.genericOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getAccessToken()}`
      }),
      responseType: "json"
    }

    this.authService.accessTokenChangedEvent.subscribe(data => {
      this.genericOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getAccessToken()}`
        }),
        responseType: "json"
      }
    })
  }

  public async addMedicalUnit(medicalUnit: MedicalUnit, responseHandling: AbstractResponseHandling<Object>) {
    console.log(medicalUnit)
    try {
      const res = await this.http.post<AbstractResponse<Object>>(environment.addMedicalUnit, medicalUnit, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getAuthorizedMedicalUnit(responseHandling: AbstractResponseHandling<MedicalUnit>) {
    try {
      const res = await this.http.get<AbstractResponse<MedicalUnit>>(environment.getAuthorizedMedicalUnit, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getMedicalUnitDetails(medicalUnit: string, responseHandling: AbstractResponseHandling<MedicalUnit>) {
    const url = `${environment.getMedicalUnitDetails}/${medicalUnit}`
    try {
      const res = await this.http.get<AbstractResponse<MedicalUnit>>(url, this.genericOptions).toPromise();
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

  public async verifyMedicalUnit(medUnit: MedicalUnit, responseHandling: AbstractResponseHandling<Object>) {
    await this.web3Service.initialize();

    this.web3Service.contract.methods.addMedicalUnit(medUnit.hash, medUnit.accountAddress).send({
      from: this.web3Service.connectedAccounts[0],
      gas: 150000,
    })
      .on('receipt', async (receipt) => {
        try {
          const req = { medicalUnitHash: medUnit.hash };
          const res = await this.http.post<AbstractResponse<Object>>(environment.verifyMedicalUnit, req, this.genericOptions).toPromise();
          responseHandling.response = res;
          responseHandling.reciept = receipt;
        } catch (err) {
          responseHandling.err = err;
        }

        this.responseHandler.handle(responseHandling);
      })
      .on('error', async (error, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        responseHandling.err = error;
        responseHandling.reciept = receipt;
        this.responseHandler.handle(responseHandling);
      });
  }

  public async rejectMedicalUnit(medUnit: MedicalUnit, responseHandling: AbstractResponseHandling<Object>) {
    // throw new NotImplementedException();
    console.log('rejectMedicalUnit is not implemented.')
  };

  public async getAvailableVaccineDoses(medicalUnitHash: string, responseHandling: AbstractResponseHandling<VaccineDose[]>) {
    try {
      const url = `${environment.getAvailableVaccineDoses}/${medicalUnitHash}`;
      const res = await this.http.get<AbstractResponse<VaccineDose[]>>(url).toPromise();
      responseHandling.response = res;
    } catch (err) {
      responseHandling.err = err;
    };

    this.responseHandler.handle(responseHandling);
  }

  public async issueCertificate(cert: Certificate, responseHandling: AbstractResponseHandling<Certificate>) {
    await this.web3Service.initialize();

    cert.hash = hash(`${cert.medicalUnitHash}${cert.injectorHash}${cert.vaccineDoseHash}`);
    console.log(cert)

    this.web3Service.contract.methods.issueCertificate(
      cert.medicalUnitHash,
      cert.injectorHash,
      cert.vaccineDoseHash,
      cert.hash,
    ).send({
      from: this.web3Service.connectedAccounts[0],
      gas: 400000,
    })
      .on('receipt', async (receipt) => {
        try {
          const res = await this.http.post<AbstractResponse<Certificate>>(environment.issueCertificate, cert).toPromise();
          responseHandling.response = res;
        } catch (err) {
          responseHandling.err = err;
        }

        responseHandling.reciept = receipt;
        this.responseHandler.handle(responseHandling);
      })
      .on('error', async (error, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        responseHandling.err = error;
        responseHandling.reciept = receipt;
        this.responseHandler.handle(responseHandling);
      });
  }
}
