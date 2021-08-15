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


// Directives

// Components
import { PethernetComponent } from './pethernet.component';
import { MedicalunitsComponent } from './pages/medical-units/medical-units.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { AddVaccineDoseComponent } from './shared/components/add-vaccine-dose/add-vaccine-dose.component';
import { ListVaccineDosesComponent } from './shared/components/list-vaccine-doses/list-vaccine-doses.component';
import { AccountOverviewComponent } from './shared/components/account-overview/account-overview.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { InjectorsComponent } from './pages/injectors/injectors.component';
import { AddDoctorComponent } from './shared/components/add-doctor/add-doctor.component';
import { AddInjectorComponent } from './shared/components/add-injector/add-injector.component';
import { ListDoctorsComponent } from './shared/components/list-doctors/list-doctors.component';
import { ListInjectorComponent } from './shared/components/list-injector/list-injector.component';
import { AddMedicalUnitComponent } from './shared/components/register-medical-unit/register-medical-unit.component';
import { ManageMedicalUnitsComponent } from './shared/components/manage-medical-units/manage-medical-units.component';
import { MedicalUnitComponent } from './pages/medical-unit/medical-unit.component';

// Pipes


@NgModule({
  declarations: [
    // Directives


    // Components
    PethernetComponent,
    MedicalunitsComponent,
    VaccinedosesComponent,
    AddVaccineDoseComponent,
    ListVaccineDosesComponent,
    AccountOverviewComponent,
    DoctorsComponent,
    InjectorsComponent,
    AddDoctorComponent,
    AddInjectorComponent,
    ListDoctorsComponent,
    ListInjectorComponent,
    AddMedicalUnitComponent,
    ManageMedicalUnitsComponent,
    MedicalUnitComponent,

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

  ]
})
export class PethernetModule { }
