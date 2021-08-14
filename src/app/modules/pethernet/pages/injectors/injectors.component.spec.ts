import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorsComponent } from './injectors.component';

describe('InjectorsComponent', () => {
  let component: InjectorsComponent;
  let fixture: ComponentFixture<InjectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
