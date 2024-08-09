import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureServiceOrderPageComponent } from './capture-service-order-page.component';

describe('CaptureServiceOrderPageComponent', () => {
  let component: CaptureServiceOrderPageComponent;
  let fixture: ComponentFixture<CaptureServiceOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureServiceOrderPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptureServiceOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
