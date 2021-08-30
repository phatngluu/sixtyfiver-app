import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectMetamaskAccountComponent } from './connect-metamask-account.component';

describe('ConnectMetamaskAccountComponent', () => {
  let component: ConnectMetamaskAccountComponent;
  let fixture: ComponentFixture<ConnectMetamaskAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectMetamaskAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectMetamaskAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
