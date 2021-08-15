import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalUnitComponent } from './register-medical-unit.component';

describe('AddMedicalUnitComponent', () => {
  let component: AddMedicalUnitComponent;
  let fixture: ComponentFixture<AddMedicalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
