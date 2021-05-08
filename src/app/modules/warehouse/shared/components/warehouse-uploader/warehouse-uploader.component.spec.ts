import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseUploaderComponent } from './warehouse-uploader.component';

describe('WarehouseUploaderComponent', () => {
  let component: WarehouseUploaderComponent;
  let fixture: ComponentFixture<WarehouseUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
