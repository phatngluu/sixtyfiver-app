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
}
