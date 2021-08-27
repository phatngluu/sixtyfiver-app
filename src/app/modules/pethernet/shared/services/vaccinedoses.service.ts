import { AbstractResponse, AbstractResponseHandling } from './../models/abstract-response';
import { Web3Service } from './web3.service';
import { VaccineDose } from './../models/vaccine-dose';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import hash from 'object-hash';
import { RespondHandlerService } from './respond-handler.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VaccinedosesService {

  private genericOptions: object;

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service,
    private authService: AuthService,
    private responseHandler: RespondHandlerService) {
      this.web3Service.initialize();

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

  public async addVaccineDose(vaccineDose: VaccineDose, responseHandling: AbstractResponseHandling<any>): Promise<void> {
    await this.web3Service.initialize();

    vaccineDose.hash = hash(`${vaccineDose.doseId}${vaccineDose.lotNo}${vaccineDose.vaccineName}${vaccineDose.expiredDate}`);

    this.web3Service.contract.methods.addVaccineDose(vaccineDose.hash).send({
      from: this.web3Service.connectedAccounts[0],
      gas: 150000,
    })
      .on('receipt', async (receipt) => {
        try {
          const res = await this.http.post<AbstractResponse<Object>>(environment.addVaccineDose, vaccineDose, this.genericOptions).toPromise();
          responseHandling.response = res;
        } catch (error) {
          responseHandling.err = error;
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

  // public async getVaccineDoses(callback: (result: string[]) => void): Promise<void> {
  //   await this.web3Service.initialize();

  //   this.web3Service.contract.methods.vaccineDosesListGetter().call()
  //     .then((result) => {
  //       callback(result)});
  // }

  public async getVaccineDoses(responseHandling: AbstractResponseHandling<any>) {
    try {
      const res = await this.http.get<AbstractResponse<Object>>(environment.getAllVaccineDoses).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }
    this.responseHandler.handle(responseHandling);
  }

  public async distributeVaccineDose(vaccineDoseHash: string, medicalUnitHash: string, responseHandling: AbstractResponseHandling<any>) {
    const req = {
      vaccineDoseHash,
      medicalUnitHash,
    };

    try {
      const res = await this.http.post<AbstractResponse<Object>>(environment.distributeVaccineDose, req).toPromise();
      responseHandling.response = res;
    } catch (error) {
      responseHandling.err = error;
    }
    this.responseHandler.handle(responseHandling);
  }
}
