import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReeentACarComponent } from './reeent-a-car.component';

describe('ReeentACarComponent', () => {
  let component: ReeentACarComponent;
  let fixture: ComponentFixture<ReeentACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReeentACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReeentACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
