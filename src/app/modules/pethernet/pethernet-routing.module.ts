import { VaccinedosesComponent } from './pages/vaccinedoses/vaccinedoses.component';
import { MedicalunitsComponent } from './pages/medicalunits/medicalunits.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PethernetComponent } from './pethernet.component';

const routes: Routes = [
  {
    path: '',
    component: PethernetComponent,
    data: {
      breadcrumb: 'Overview'
    }
  },
  {
    path: 'overview',
    component: PethernetComponent,
    data: {
      breadcrumb: 'Overview'
    }
  },
  {
    path: 'medicalunits',
    component: MedicalunitsComponent,
    data: {
      breadcrumb: 'Medical Units'
    }
  },
  {
    path: 'vaccinedoses',
    component: VaccinedosesComponent,
    data: {
      breadcrumb: 'Vaccine Doses'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PethernetRoutingModule { }
