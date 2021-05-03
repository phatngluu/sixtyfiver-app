import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../services/file-manager.service';
import { File } from '../models/file'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'sf-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  private allFilesUrl = 'http://localhost:3000/api/warehouse/all';

  public allFiles: File[];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<File[]>(this.allFilesUrl).subscribe((data) => {
      this.allFiles = data;
    })
  }

}
