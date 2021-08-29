import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PethernetRoutingModule } from './pethernet-routing.module';

// UI Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStepsModule } from 'ng-zorro-antd/steps';


// Directives

// Components
import { PethernetComponent } from './pethernet.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { AddVaccineDoseComponent } from './shared/components/add-vaccine-dose/add-vaccine-dose.component';
import { AccountOverviewComponent } from './shared/components/account-overview/account-overview.component';
import { InjectorsComponent } from './pages/injectors/injectors.component';
import { AddPatientComponent } from './shared/components/add-patient/add-patient.component';
import { AddMedicalUnitComponent } from './shared/components/register-medical-unit/register-medical-unit.component';
import { ManageMedicalUnitsComponent } from './shared/components/manage-medical-units/manage-medical-units.component';
import { MedicalUnitComponent } from './pages/medical-unit/medical-unit.component';
import { DistributeVaccineDoseComponent } from './shared/components/distribute-vaccine-dose/distribute-vaccine-dose.component';
import { IssueCertificateComponent } from './shared/components/issue-certificate/issue-certificate.component';
import { PatientDetailComponent } from './shared/components/patient-detail/patient-detail.component';
import { CertificateDetailComponent } from './shared/components/certificate-detail/certificate-detail.component';

// Pipes


@NgModule({
  declarations: [
    // Directives


    // Components
    PethernetComponent,
    VaccinedosesComponent,
    AddVaccineDoseComponent,
    AccountOverviewComponent,
    InjectorsComponent,
    AddPatientComponent,
    AddMedicalUnitComponent,
    ManageMedicalUnitsComponent,
    MedicalUnitComponent,
    DistributeVaccineDoseComponent,
    IssueCertificateComponent,
    PatientDetailComponent,
    CertificateDetailComponent,

    // Pipes


  ],
  imports: [
    // Generic Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PethernetRoutingModule,


    // UI Modules
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSpinModule,
    NzAlertModule,
    NzCardModule,
    NzCollapseModule,
    NzTabsModule,
    NzResultModule,
    NzSelectModule,
    NzSliderModule,
    NzInputNumberModule,
    NzProgressModule,
    NzStepsModule,
  ]
})
export class PethernetModule { }
