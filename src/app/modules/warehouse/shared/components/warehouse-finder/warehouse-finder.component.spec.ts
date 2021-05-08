import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFinderComponent } from './warehouse-finder.component';

describe('WarehouseFinderComponent', () => {
  let component: WarehouseFinderComponent;
  let fixture: ComponentFixture<WarehouseFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
