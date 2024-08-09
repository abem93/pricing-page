import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComparisonTableComponent } from './plan-comparison-table.component';

describe('PlanComparisonTableComponent', () => {
  let component: PlanComparisonTableComponent;
  let fixture: ComponentFixture<PlanComparisonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanComparisonTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanComparisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
