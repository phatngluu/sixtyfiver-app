import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInjectorComponent } from './add-injector.component';

describe('AddInjectorComponent', () => {
  let component: AddInjectorComponent;
  let fixture: ComponentFixture<AddInjectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInjectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
