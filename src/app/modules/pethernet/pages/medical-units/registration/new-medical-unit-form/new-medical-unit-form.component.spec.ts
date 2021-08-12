import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicalUnitFormComponent } from './new-medical-unit-form.component';

describe('NewMedicalUnitFormComponent', () => {
  let component: NewMedicalUnitFormComponent;
  let fixture: ComponentFixture<NewMedicalUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMedicalUnitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedicalUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
