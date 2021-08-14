import { DoctorService } from './../../services/doctor.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sf-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDoctorsComponent implements OnInit {

  public doctorsList: string[];

  constructor(
    private ref: ChangeDetectorRef,
    private doctorService: DoctorService) { }

  async ngOnInit(): Promise<void> {
    const callback = (result: string[]) => {
      this.doctorsList = result;
      this.ref.detectChanges();
    };
    callback.bind(this);

    await this.doctorService.getDoctors(callback);

    this.doctorService.doctorAddedEvent.subscribe(async () => {
      console.log('event emitted.')
      await this.doctorService.getDoctors(callback);
    })
  }

}
