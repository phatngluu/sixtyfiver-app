import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalunitsComponent } from './medical-units.component';

describe('MedicalunitsComponent', () => {
  let component: MedicalunitsComponent;
  let fixture: ComponentFixture<MedicalunitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalunitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
