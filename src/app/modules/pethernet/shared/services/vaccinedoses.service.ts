import { AbstractResponse } from './../models/abstract-response';
import { Web3Service } from './web3.service';
import { VaccineDose } from './../models/vaccine-dose';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import hash from 'object-hash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RespondHandlerService } from './respond-handler.service';


@Injectable({
  providedIn: 'root'
})
export class VaccinedosesService {

  private genericOptions: object = { responseType: "json" };

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service,
    private responseHandler: RespondHandlerService,
    private messageService: NzMessageService) {
      this.web3Service;
  }

  public async addVaccineDose(vaccineDose: VaccineDose, callback: () => void): Promise<void> {
    await this.web3Service.initialize();

    vaccineDose.hash = hash(`${vaccineDose.doseId}${vaccineDose.lotNo}${vaccineDose.vaccineName}${vaccineDose.expiredDate}`);

    this.web3Service.contract.methods.addVaccineDose(vaccineDose.hash).send({
      from: this.web3Service.connectedAccounts[0],
      gas: 150000,
    })
      .on('receipt', async (receipt) => {
        const res = await this.http.post<AbstractResponse<Object>>(environment.addVaccineDose, vaccineDose, this.genericOptions).toPromise();
        callback();
        this.responseHandler.handle(res, 'Vaccine dose is added.', 'Vaccine is not added.');
      })
      .on('error', async (error, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        callback();
        this.responseHandler.contractHandle(receipt, error, 'Vaccine dose is added.', 'Vaccine is not added.');
      });
  }

  public async getVaccineDoses(callback: (result: string[]) => void): Promise<void> {
    await this.web3Service.initialize();

    this.web3Service.contract.methods.vaccineDosesListGetter().call()
      .then((result) => {
        console.log(result);
        callback(result)});
  }

  // getMinistryOfHealthAddr(callback: (result: string) => void): void {
  //   this.web3Service.contract.vaccineDosesList.call({
  //     from: this.web3Service.connectedAccounts[0],
  //     gas: 150000
  //   })
  //     .then((result) => {
  //       console.log(result);
  //       callback(result)});
  // }

  // getAllFiles(): Observable<FileModel[]> {
  //   return this.http.get<FileModel[]>(environment.allFilesUrl);
  // }

  // deleteFile(fileid: string): Observable<any> {
  //   console.log(environment.deleteFileUrl + fileid);

  //   return this.http.delete(environment.deleteFileUrl + fileid);
  // }

  // getSelectedFileNames(selectedFileIds: Set<string>, fileInfos: FileModel[]): string {
  //   const selectedFileNames = fileInfos
  //     .filter(fileInfo => selectedFileIds.has(fileInfo.fileid))
  //     .map(fileInfo => `<li>${fileInfo.name}</li>`).join('');
  //   return `<ul>${selectedFileNames}</ul>`;
  // }

  // downloadFile(fileid: string): Observable<Blob> {
  //   return this.http.get(environment.downloadFileUrl + fileid, { responseType: 'blob' });
  // }
}
