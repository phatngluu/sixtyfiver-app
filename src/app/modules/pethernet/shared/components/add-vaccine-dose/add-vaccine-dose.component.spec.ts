import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaccineDoseComponent } from './add-vaccine-dose.component';

describe('AddVaccineDoseComponent', () => {
  let component: AddVaccineDoseComponent;
  let fixture: ComponentFixture<AddVaccineDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVaccineDoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVaccineDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
