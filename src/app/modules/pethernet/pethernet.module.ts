import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PethernetRoutingModule } from './pethernet-routing.module';

// UI Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

// Directives

// Components
import { PethernetComponent } from './pethernet.component';
import { MedicalunitsComponent } from './pages/medical-units/medical-units.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { AddVaccineDoseComponent } from './shared/components/add-vaccine-dose/add-vaccine-dose.component';
import { NewMedicalUnitFormComponent } from './pages/medical-units/registration/new-medical-unit-form/new-medical-unit-form.component';
import { MedicalUnitRegistrationComponent } from './pages/medical-units/registration/medical-unit-registration/medical-unit-registration.component';
import { VaccineDosesListComponent } from './shared/components/vaccine-doses-list/vaccine-doses-list.component';

// Pipes


@NgModule({
  declarations: [
    // Directives


    // Components
    PethernetComponent,
    MedicalunitsComponent,
    VaccinedosesComponent,
    AddVaccineDoseComponent,
    NewMedicalUnitFormComponent,
    MedicalUnitRegistrationComponent,
    VaccineDosesListComponent,

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

  ]
})
export class PethernetModule { }
