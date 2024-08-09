import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureServicesPageComponent } from './capture-services-page.component';

describe('CaptureServicesPageComponent', () => {
  let component: CaptureServicesPageComponent;
  let fixture: ComponentFixture<CaptureServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureServicesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptureServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
