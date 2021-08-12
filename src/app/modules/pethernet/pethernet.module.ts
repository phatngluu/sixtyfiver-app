import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PethernetRoutingModule } from './pethernet-routing.module';

// Directives

// Components
import { PethernetComponent } from './pethernet.component';
import { MedicalunitsComponent } from './pages/medical-units/medical-units.component';
import { VaccinedosesComponent } from './pages/vaccine-doses/vaccine-doses.component';
import { AddVaccineDoseComponent } from './shared/components/add-vaccine-dose/add-vaccine-dose.component';

// Pipes

// UI Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NewMedicalUnitFormComponent } from './pages/medical-units/registration/new-medical-unit-form/new-medical-unit-form.component';
import { MedicalUnitRegistrationComponent } from './pages/medical-units/registration/medical-unit-registration/medical-unit-registration.component';


@NgModule({
  declarations: [
    // Directives


    // Components
    PethernetComponent,
    MedicalunitsComponent,
    VaccinedosesComponent,
    AddVaccineDoseComponent,
    NewMedicalUnitFormComponent,
    MedicalUnitRegistrationComponent

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

  ]
})
export class PethernetModule { }
