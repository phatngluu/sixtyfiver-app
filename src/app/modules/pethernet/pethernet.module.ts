import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PethernetRoutingModule } from './pethernet-routing.module';
import { PethernetComponent } from './pethernet.component';
import { MedicalunitsComponent } from './pages/medicalunits/medicalunits.component';
import { VaccinedosesComponent } from './pages/vaccinedoses/vaccinedoses.component';


@NgModule({
  declarations: [
    PethernetComponent,
    MedicalunitsComponent,
    VaccinedosesComponent
  ],
  imports: [
    CommonModule,
    PethernetRoutingModule
  ]
})
export class PethernetModule { }
