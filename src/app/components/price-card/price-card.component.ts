import { Component, OnInit, Input, ChangeDetectorRef, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './price-card.component.html',
  styleUrl: './price-card.component.scss'
})
export class PriceCardComponent implements OnInit {
  @ViewChildren('sliderContainer') sliderContainers!: QueryList<ElementRef>;
  @Input() planType!: SubscriptionPlan;
  @Input() isAnnual = true;

  isSelected = false;
  selectedPlanName = '';
  planDetails: SubscriptionPlan[] = [];
  spacesPerPlan: { [planName: string]: number } = {};
  sliderIndex = 0;
  displayValue = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private planDetailsService: SubcriptionPlanDetailsService,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.planDetails = this.planDetailsService.getSubscriptionPlans();
    this.initializeComponent();
    this.subscribeToServices();
  }

  initializeComponent() {
    this.initializeSlider();
    this.loadStoredData();
  }

  subscribeToServices() {
    this.subscriptions.push(
      this.shoppingCartService.planSelectedSubject.subscribe(planName => {
        this.selectedPlanName = planName;
        this.isSelected = this.selectedPlanName === this.planType.name;
        this.isSelected ? this.updateShoppingCart() : this.shoppingCartService.removeItemFromCart(this.planType.name);
      }),
      this.shoppingCartService.isAnnualSubject.subscribe(isAnnual => {
        if (this.isAnnual !== isAnnual) {
          this.isAnnual = isAnnual;
          if (this.isSelected) this.updateShoppingCart();
        }
      })
    );
  }

  initializeSlider() {
    const plan = this.findSelectedPlan(this.planType.name);
    if (plan?.spaces?.length) {
      this.sliderIndex = 0;
      this.displayValue = plan.spaces[0];
      this.spacesPerPlan[this.planType.name] = this.displayValue;

      const selectedPlanDetails = this.shoppingCartService.getSelectedPlan();
      if (selectedPlanDetails?.name === this.planType.name) {
        const storedSpacesIndex = plan.spaces.indexOf(selectedPlanDetails.spaces);
        if (storedSpacesIndex !== -1) {
          this.sliderIndex = storedSpacesIndex;
          this.displayValue = selectedPlanDetails.spaces;
          this.spacesPerPlan[this.planType.name] = this.displayValue;
        }
      }

      if (this.isSelected) {
        this.updateShoppingCart();
      }
    }
  }

  loadStoredData() {
    const selectedPlanDetails = this.shoppingCartService.getSelectedPlan();
    if (selectedPlanDetails) {
      this.selectedPlanName = selectedPlanDetails.name;
      this.isSelected = this.selectedPlanName === this.planType.name;
    }

    const storedIsAnnual = localStorage.getItem('isAnnual');
    if (storedIsAnnual !== null) {
      this.isAnnual = JSON.parse(storedIsAnnual);
    }
  }

  onSliderChange(event: Event, container: HTMLElement) {
    const slider = event.target as HTMLInputElement;
    const value = parseInt(slider.value);
    this.sliderIndex = value;

    const plan = this.findSelectedPlan(this.planType.name);
    if (plan?.spaces) {
      this.displayValue = plan.spaces[value];
      this.spacesPerPlan[this.planType.name] = this.displayValue;
    }

    const span = container.querySelector('.slider-value') as HTMLElement;
    if (span && slider) {
      const percent = (value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min));
      const spanWidth = span.offsetWidth;
      const sliderWidth = slider.offsetWidth;
      const leftOffset = percent * (sliderWidth - spanWidth);
      span.style.left = `${leftOffset}px`;
    }

    this.updateShoppingCart();
    this.cdr.detectChanges();
  }

  sliderSnapToValues(name: string, index: number) {
    const plan = this.findSelectedPlan(name);
    if (plan?.spaces && index >= 0 && index < plan.spaces.length) {
      this.spacesPerPlan[name] = plan.spaces[index];
      this.displayValue = plan.spaces[index];
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
    this.shoppingCartService.planSelectionChange(this.planType.name);
    this.isSelected = true;
    this.updateShoppingCart();
  }

  updateShoppingCart() {
    const selectedPlan = this.findSelectedPlan(this.planType.name);
    if (selectedPlan && this.isSelected) {
      const spaces = this.spacesPerPlan[this.planType.name];
      this.shoppingCartService.addSubscriptionToCart(selectedPlan, spaces, this.isAnnual);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}