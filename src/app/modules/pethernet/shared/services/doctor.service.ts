import hash from 'object-hash';
import { Web3Service } from './web3.service';
import { environment } from 'src/environments/environment';
import { AbstractResponse, AbstractResponseHandling } from './../models/abstract-response';
import { EventEmitter, Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { HttpClient } from '@angular/common/http';
import { RespondHandlerService } from './respond-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private genericOptions: object = { responseType: "json" };

  public doctorAddedEvent = new EventEmitter();

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service,
    private responseHandler: RespondHandlerService) {
  }

  public async addDoctor(doctor: Doctor, responseHandling: AbstractResponseHandling<Object>) {
    try {
      const res = await this.http.post<AbstractResponse<Object>>(environment.addDoctor, doctor, this.genericOptions).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }

    this.responseHandler.handle(responseHandling);
  }

  public async getDoctors(callback: (result: string[]) => void): Promise<void> {
    await this.web3Service.initialize();

    this.web3Service.contract.methods.doctorsListGetter().call()
      .then(result => callback(result));
  }

  public async checkDoctorExisted(citizenId: string): Promise<boolean> {
    const injectorHash = hash(citizenId);
    const url = `${environment.checkDoctor}?hash=${injectorHash}`;

    const abstractRes = await this.http.get<AbstractResponse<boolean>>(url).toPromise();
    return abstractRes.message;
  }
}
