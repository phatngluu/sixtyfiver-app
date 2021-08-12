import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDosesListComponent } from './vaccine-doses-list.component';

describe('VaccineDosesListComponent', () => {
  let component: VaccineDosesListComponent;
  let fixture: ComponentFixture<VaccineDosesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineDosesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineDosesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
