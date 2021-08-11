import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinedosesComponent } from './vaccinedoses.component';

describe('VaccinedosesComponent', () => {
  let component: VaccinedosesComponent;
  let fixture: ComponentFixture<VaccinedosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinedosesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinedosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
