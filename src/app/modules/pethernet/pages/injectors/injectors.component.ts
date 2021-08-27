import { VaccineDose } from './../../shared/models/vaccine-dose';
import { Injector } from './../../shared/models/injector';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractResponse, AbstractResponseHandling } from '../../shared/models/abstract-response';
import { InjectorService } from '../../shared/services/injector.service';
import { Certificate } from '../../shared/models/certificate';
import { MedicalUnit } from '../../shared/models/medical-unit';

@Component({
  templateUrl: './injectors.component.html',
  styleUrls: ['./injectors.component.css']
})
export class InjectorsComponent implements OnInit {
  injector: Injector;
  certificates: Certificate[];
  medicalUnit: MedicalUnit;
  vaccineDose: VaccineDose;

  constructor(
    private ref: ChangeDetectorRef,
    private injectorService: InjectorService,
  ) { }

  async ngOnInit() {
    const responseHandling: AbstractResponseHandling<Injector> = {
      callback: (result: AbstractResponse<Injector>) => {
        this.injector = result.message;
        this.ref.markForCheck();

        const responseHandling2: AbstractResponseHandling<Certificate[]> = {
          callback: (result: AbstractResponse<Certificate[]>) => {
            this.certificates = result.message;
            this.ref.markForCheck();
          }
        }

        this.injectorService.getAuthorizedCerts(responseHandling2)
      }
    }

    await this.injectorService.getAuthorizedInjector(responseHandling);
  }

}
