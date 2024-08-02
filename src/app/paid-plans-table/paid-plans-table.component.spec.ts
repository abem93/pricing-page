import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPlansTableComponent } from './paid-plans-table.component';

describe('PaidPlansTableComponent', () => {
  let component: PaidPlansTableComponent;
  let fixture: ComponentFixture<PaidPlansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidPlansTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidPlansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
