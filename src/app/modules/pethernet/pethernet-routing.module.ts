import { RoleGuard } from './../../shared/auth/role.guard';
import { IssueCertificateComponent } from './shared/components/issue-certificate/issue-certificate.component';
import { ManageMedicalUnitsComponent } from './shared/components/manage-medical-units/manage-medical-units.component';
import { AddMedicalUnitComponent } from './shared/components/register-medical-unit/register-medical-unit.component';
import { MedicalUnitComponent } from './pages/medical-unit/medical-unit.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PethernetComponent } from './pethernet.component';
import { DistributeVaccineDoseComponent } from './shared/components/distribute-vaccine-dose/distribute-vaccine-dose.component';
import { Role } from 'src/app/shared/models/auth-credential';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PethernetComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      breadcrumb: 'Overview'
    }
  },
  {
    path: 'overview',
    component: PethernetComponent,
    canActivate: [AuthGuard, RoleGuard],
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
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MedicalUnit],
          breadcrumb: 'Overview'
        }
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: AddMedicalUnitComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MedicalUnit],
          breadcrumb: 'Register'
        }
      },
      {
        path: 'manage',
        pathMatch: 'full',
        component: ManageMedicalUnitsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MinistryOfHealth],
          breadcrumb: 'Manage'
        }
      },
      {
        path: 'issueCertificate',
        pathMatch: 'full',
        component: IssueCertificateComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MedicalUnit],
          breadcrumb: 'Issue Certificate'
        }
      },
    ],
    data: {
      breadcrumb: 'Medical Unit'
    }
  },
  {
    path: 'vaccinedoses',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard, RoleGuard],
        pathMatch: 'full',
        redirectTo: 'add',
        data: {
          roles: [Role.MinistryOfHealth],
        }
      },
      {
        path: 'add',
        pathMatch: 'full',
        component: VaccinedosesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MinistryOfHealth],
          breadcrumb: 'Add'
        }
      },
      {
        path: 'distribute',
        pathMatch: 'full',
        component: DistributeVaccineDoseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MinistryOfHealth],
          breadcrumb: 'Distribute'
        }
      },
      {
        path: 'distribute/:medicalUnitHash',
        component: DistributeVaccineDoseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Role.MinistryOfHealth],
          breadcrumb: 'Distribute'
        }
      },
    ],
    data: {
      breadcrumb: 'Vaccine Doses'
    }
  },
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [Role.Injector],
      breadcrumb: 'Patients'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PethernetRoutingModule { }
