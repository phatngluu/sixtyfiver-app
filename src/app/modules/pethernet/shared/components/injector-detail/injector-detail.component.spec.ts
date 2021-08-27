import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorDetailComponent } from './injector-detail.component';

describe('InjectorDetailComponent', () => {
  let component: InjectorDetailComponent;
  let fixture: ComponentFixture<InjectorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
