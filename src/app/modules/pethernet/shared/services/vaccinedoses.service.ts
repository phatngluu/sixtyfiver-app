import { Web3Service } from './web3.service';
import { VaccineDose } from './../models/vaccine-dose';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VaccinedosesService {

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service) {

  }

  addVaccineDose(vaccineDose: VaccineDose): Observable<any> {
    return this.http.post(environment.addVaccineDose, vaccineDose);
  }

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
