import { Component, OnInit, Input, ChangeDetectorRef, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SubcriptionPlanDetailsService } from '../services/plan-details.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SubscriptionPlan } from '../models/subscription-plan.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './price-card.component.html',
  styleUrl: './price-card.component.scss'
})
export class PriceCardComponent implements OnInit {
  @ViewChildren('sliderContainer') sliderContainers!: QueryList<ElementRef>;
  @Input() planTypeName: string = ''
  @Input() isAnnual = true;
  isSelected: boolean = false;
  selectedPlanName: string = '';
  planDetails: SubscriptionPlan[] = [];
  private subscriptions: Subscription[] = []
  spacesPerPlan: { [planName: string]: number } = {};
  sliderIndex: number = 0;
  displayValue = 0;

  constructor(
    private planDetailsService: SubcriptionPlanDetailsService,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.planDetails = this.planDetailsService.getSubscriptionPlans();
    this.initializeSlider();

    // Check for stored Selected Plan (just for setting isSelected)
    const selectedPlanDetails = this.shoppingCartService.getSelectedPlan();
    if (selectedPlanDetails) {
      this.selectedPlanName = selectedPlanDetails.name;
      this.isSelected = this.selectedPlanName === this.planTypeName;
    }

    // Load isAnnual from storage
    const storedIsAnnual = localStorage.getItem('isAnnual');
    if (storedIsAnnual !== null) {
      this.isAnnual = JSON.parse(storedIsAnnual);
    }

    // Subscribe to plan selection changes
    this.subscriptions.push(
      this.shoppingCartService.planSelectedSubject.subscribe((planName) => {
        this.selectedPlanName = planName;
        this.isSelected = this.selectedPlanName === this.planTypeName;
        if (this.isSelected) {
          this.updateShoppingCart();
        } else {
          this.shoppingCartService.removeItemFromCart(this.planTypeName);
        }
      })
    );

    // Subscribe to isAnnual changes
    this.subscriptions.push(
      this.shoppingCartService.isAnnualSubject.subscribe((isAnnual) => {
        if (this.isAnnual !== isAnnual) {
          this.isAnnual = isAnnual;
          if (this.isSelected) {
            this.updateShoppingCart();
          }
        }
      })
    );

    // Check for any changes
    this.cdr.detectChanges();
  }


  initializeSlider() {
    const plan = this.findSelectedPlan(this.planTypeName);
    if (plan && plan.spaces && plan.spaces.length > 0) {
      this.sliderIndex = 0; // Start with the first value
      this.displayValue = plan.spaces[this.sliderIndex];
      this.spacesPerPlan[this.planTypeName] = this.displayValue;

      // Check for stored Selected Plan
      const selectedPlanDetails = this.shoppingCartService.getSelectedPlan();
      if (selectedPlanDetails && selectedPlanDetails.name === this.planTypeName) {
        const storedSpacesIndex = plan.spaces.indexOf(selectedPlanDetails.spaces);
        if (storedSpacesIndex !== -1) {
          this.sliderIndex = storedSpacesIndex;
          this.displayValue = selectedPlanDetails.spaces;
          this.spacesPerPlan[this.planTypeName] = this.displayValue;
        }
      }

      // If this plan is selected, update the shopping cart
      if (this.isSelected) {
        this.updateShoppingCart();
      }
    } else {
      // Handle the case where there are no spaces defined for the plan
      this.sliderIndex = 0;
      this.displayValue = 0;
      this.spacesPerPlan[this.planTypeName] = 0;
    }
  }



  onSliderChange(event: Event, container: HTMLElement) {
    const slider = event.target as HTMLInputElement;
    const value = parseInt(slider.value);
    this.sliderIndex = value;

    // update display value
    const plan = this.findSelectedPlan(this.planTypeName);
    if (plan && plan.spaces) {
      this.displayValue = plan.spaces[value];
      this.spacesPerPlan[this.planTypeName] = this.displayValue;
    }

    // Find the span within slider container
    const span = container.querySelector('.slider-value') as HTMLElement;
    if (span && slider) {
      const percent = (value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min));
      const spanWidth = span.offsetWidth;
      const sliderWidth = slider.offsetWidth;
      const leftOffset = percent * (sliderWidth - spanWidth);
      span.style.left = `${leftOffset}px`;
    }

    // Update the shopping cart regardless of whether the plan is selected
    this.updateShoppingCart();

    // Trigger change detection
    this.cdr.detectChanges();
  }

  sliderSnapToValues(name: string, index: number) {
    const plan = this.findSelectedPlan(name);
    if (plan && plan.spaces && index >= 0 && index < plan.spaces.length) {
      this.spacesPerPlan[name] = plan.spaces[index];
      this.displayValue = plan.spaces[index];  // Add this line
      this.sliderIndex = index;
      if (this.isSelected) {
        this.updateShoppingCart();
      }
      this.cdr.detectChanges();
    }
  }

  findSelectedPlan(name: string): SubscriptionPlan | undefined {
    return this.planDetails.find((plan: SubscriptionPlan) => plan.name === name);
  }

  planSelected() {
    this.shoppingCartService.planSelectionChange(this.planTypeName);
    this.isSelected = true;
    this.updateShoppingCart();
  }

  updateShoppingCart() {
    const selectedPlan = this.findSelectedPlan(this.planTypeName);
    if (selectedPlan) {
      const spaces = this.spacesPerPlan[this.planTypeName];
      console.log(`Updating cart for ${this.planTypeName}: ${spaces} spaces`);
      if (this.isSelected) {
        this.shoppingCartService.addSubscriptionToCart(selectedPlan, spaces, this.isAnnual);
      }
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}