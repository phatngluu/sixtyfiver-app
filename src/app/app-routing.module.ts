import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './warehouse/file-manager/file-manager.component';
import { FileUploaderComponent } from './warehouse/file-uploader/file-uploader.component';

const routes: Routes = [
  {
    path: 'warehouse',
    children: [
      { path: '', component: FileManagerComponent },
      { path: 'file-manager', component: FileManagerComponent },
      { path: 'file-uploader', component: FileUploaderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
