import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeVaccineDoseComponent } from './distribute-vaccine-dose.component';

describe('DistributeVaccineDoseComponent', () => {
  let component: DistributeVaccineDoseComponent;
  let fixture: ComponentFixture<DistributeVaccineDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributeVaccineDoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributeVaccineDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
