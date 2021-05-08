import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/file-model'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFiles(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(environment.allFilesUrl);
  }

  deleteFile(fileid: string): Observable<any> {
    console.log(environment.deleteFileUrl + fileid);

    return this.http.delete(environment.deleteFileUrl + fileid);
  }

  getSelectedFileNames(selectedFileIds: Set<string>, fileInfos: FileModel[]): string {
    let selectedFileNames = fileInfos.filter(fileInfo => selectedFileIds.has(fileInfo.fileid)).map(fileInfo => `<li>${fileInfo.name}</li>`).join('');
    return `<ul>${selectedFileNames}</ul>`;
  }

  downloadFile(fileid: string): Observable<any>{
    return this.http.get<any>(environment.downloadFileUrl + fileid);
  }
}
