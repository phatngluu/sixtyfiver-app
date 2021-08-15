import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalUnitComponent } from './medical-unit.component';

describe('MedicalUnitComponent', () => {
  let component: MedicalUnitComponent;
  let fixture: ComponentFixture<MedicalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
