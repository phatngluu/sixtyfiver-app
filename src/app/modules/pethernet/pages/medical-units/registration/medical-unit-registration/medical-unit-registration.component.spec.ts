import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalUnitRegistrationComponent } from './medical-unit-registration.component';

describe('MedicalUnitRegistrationComponent', () => {
  let component: MedicalUnitRegistrationComponent;
  let fixture: ComponentFixture<MedicalUnitRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalUnitRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalUnitRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
