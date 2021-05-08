import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFileItemComponent } from './warehouse-file-item.component';

describe('WarehouseFileItemComponent', () => {
  let component: WarehouseFileItemComponent;
  let fixture: ComponentFixture<WarehouseFileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFileItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseFileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
