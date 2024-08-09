import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingConfigComponent } from './pricing-config.component';

describe('PricingConfigComponent', () => {
  let component: PricingConfigComponent;
  let fixture: ComponentFixture<PricingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
