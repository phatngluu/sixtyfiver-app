import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PethernetRoutingModule } from './pethernet-routing.module';

// Directives

// Components
import { PethernetComponent } from './pethernet.component';
import { MedicalunitsComponent } from './pages/medicalunits/medicalunits.component';
import { VaccinedosesComponent } from './pages/vaccinedoses/vaccinedoses.component';
import { AddVaccineDoseComponent } from './shared/components/add-vaccine-dose/add-vaccine-dose.component';

// Pipes

// UI Modules
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [
    // Directives


    // Components
    PethernetComponent,
    MedicalunitsComponent,
    VaccinedosesComponent,
    AddVaccineDoseComponent

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


  ]
})
export class PethernetModule { }
