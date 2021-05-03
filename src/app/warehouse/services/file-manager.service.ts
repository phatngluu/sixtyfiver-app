import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../models/file'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private allFilesUrl = 'http://localhost:3000/api/warehouse/all'

  constructor(
    private http: HttpClient
  ) { }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.allFilesUrl);
  }
}
