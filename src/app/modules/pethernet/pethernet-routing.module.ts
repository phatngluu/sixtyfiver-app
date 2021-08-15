import { ManageMedicalUnitsComponent } from './shared/components/manage-medical-units/manage-medical-units.component';
import { AddMedicalUnitComponent } from './shared/components/register-medical-unit/register-medical-unit.component';
import { MedicalUnitComponent } from './pages/medical-unit/medical-unit.component';
import { InjectorsComponent } from './pages/injectors/injectors.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PethernetComponent } from './pethernet.component';
import { DistributeVaccineDoseComponent } from './shared/components/distribute-vaccine-dose/distribute-vaccine-dose.component';

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
    path: 'medicalunit',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: MedicalUnitComponent,
        data: {
          breadcrumb: 'Overview'
        }
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: AddMedicalUnitComponent,
        data: {
          breadcrumb: 'Register'
        }
      },
      {
        path: 'manage',
        pathMatch: 'full',
        component: ManageMedicalUnitsComponent,
        data: {
          breadcrumb: 'Manage'
        }
      },
    ],
    data: {
      breadcrumb: 'Medical Unit'
    }
  },
  {
    path: 'vaccinedoses',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: VaccinedosesComponent,
        data: {
          breadcrumb: 'Overview'
        }
      },
      {
        path: 'distribute',
        pathMatch: 'full',
        component: DistributeVaccineDoseComponent,
        data: {
          breadcrumb: 'Distribute'
        }
      },
      {
        path: 'distribute/:medicalUnitHash',
        component: DistributeVaccineDoseComponent,
        data: {
          breadcrumb: 'Distribute'
        }
      },
    ],
    data: {
      breadcrumb: 'Vaccine Doses'
    }
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {
      breadcrumb: 'Doctors'
    }
  },
  {
    path: 'injectors',
    component: InjectorsComponent,
    data: {
      breadcrumb: 'Injectors'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PethernetRoutingModule { }
