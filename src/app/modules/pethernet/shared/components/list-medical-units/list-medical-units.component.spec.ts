import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalUnitsComponent } from './list-medical-units.component';

describe('ListMedicalUnitsComponent', () => {
  let component: ListMedicalUnitsComponent;
  let fixture: ComponentFixture<ListMedicalUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicalUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicalUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
