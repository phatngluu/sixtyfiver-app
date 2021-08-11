import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PethernetComponent } from './pethernet.component';

describe('PethernetComponent', () => {
  let component: PethernetComponent;
  let fixture: ComponentFixture<PethernetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PethernetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PethernetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
