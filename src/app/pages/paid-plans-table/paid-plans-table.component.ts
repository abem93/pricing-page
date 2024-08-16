import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { PriceCardComponent } from '../../components/price-card/price-card.component';
import { CartComponent } from '../../components/cart/cart.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-paid-plans-table',
  standalone: true,
  imports: [CommonModule, PriceCardComponent, CartComponent, FaqComponent],
  templateUrl: './paid-plans-table.component.html',
  styleUrl: './paid-plans-table.component.scss'
})
export class PaidPlansTableComponent implements OnInit, OnDestroy {
  planDetails: SubscriptionPlan[] = [];
  isAnnual: boolean = true;
  sortedPlanDetails: SubscriptionPlan[] = [];
  selectedPlanName: string = '';
  isMobile: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private planDetailsService: SubcriptionPlanDetailsService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.planDetails = this.planDetailsService.getSubscriptionPlans();
   
    this.subscriptions.push(
      this.shoppingCartService.isAnnualSubject.subscribe(isAnnual => {
        this.isAnnual = isAnnual;
      }),
      this.shoppingCartService.planSelectedSubject.subscribe(planName => {
        this.selectedPlanName = planName;
        this.updatePlanOrder();
      })
    );

   if(this.shoppingCartService.getSelectedPlan()){
     this.selectedPlanName = this.shoppingCartService.getSelectedPlan()?.name || '';
   }

    this.updatePlanOrder();
  }

  checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 1024;
    if (wasMobile !== this.isMobile) {
      this.updatePlanOrder();
    }
  }

  updatePlanOrder() {
    if (this.isMobile && this.selectedPlanName) {
      this.sortedPlanDetails = [...this.planDetails].sort((a, b) => {
        if (a.name === this.selectedPlanName) return -1;
        if (b.name === this.selectedPlanName) return 1;
        return 0;
      });
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      this.sortedPlanDetails = [...this.planDetails];
    }
  }

  togglePricingMode(mode: string) {
    if ((mode === 'annual' && this.isAnnual) || (mode === 'monthly' && !this.isAnnual)) {
      return;
    }
    const newIsAnnual = !this.isAnnual;
    this.shoppingCartService.priceModeToggled(newIsAnnual);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }
}