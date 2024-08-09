import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureServicesCardComponent } from './capture-services-card.component';

describe('CaptureServicesCardComponent', () => {
  let component: CaptureServicesCardComponent;
  let fixture: ComponentFixture<CaptureServicesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureServicesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptureServicesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
