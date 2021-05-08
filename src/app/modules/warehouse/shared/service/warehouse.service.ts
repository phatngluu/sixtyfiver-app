import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../models/file'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(environment.allFilesUrl);
  }

  getBeautifySize(nBytes) {
    if (nBytes <= 1024) return `${nBytes} B`;
    const aMultiples = ["KB", "MB", "GB", "TB"];
    for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        var sOutput = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
    }
    return sOutput;
  }
}
