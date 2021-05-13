import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFinderToolbarComponent } from './warehouse-finder-toolbar.component';

describe('WarehouseFinderToolbarComponent', () => {
  let component: WarehouseFinderToolbarComponent;
  let fixture: ComponentFixture<WarehouseFinderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFinderToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseFinderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
