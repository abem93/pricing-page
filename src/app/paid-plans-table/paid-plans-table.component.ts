import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { PriceCardComponent } from '../price-card/price-card.component';
import { SubcriptionPlanDetailsService } from '../services/plan-details.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { SubscriptionPlan } from '../models/subscription-plan.model';

@Component({
  selector: 'app-paid-plans-table',
  standalone: true,
  imports: [CommonModule,PriceCardComponent, CartComponent],
  templateUrl: './paid-plans-table.component.html',
  styleUrl: './paid-plans-table.component.scss'
})
export class PaidPlansTableComponent implements OnInit, OnDestroy {
  planDetails:SubscriptionPlan[]=[];
  isAnnual:boolean = true;

  constructor(private planDetailsService:SubcriptionPlanDetailsService, private shoppingCartService:ShoppingCartService){}

  private subscriptions: Subscription[] = []

  ngOnInit() {
    this.planDetails = this.planDetailsService.getSubscriptionPlans();
    this.subscriptions.push(
      this.shoppingCartService.isAnnualSubject.subscribe((isAnnual => {
        this.isAnnual = isAnnual;
      }))
    )
  }

  togglePricingMode(mode:string){
    if(mode === 'annual' && this.isAnnual || mode == 'monthly' && !this.isAnnual){
      return;
    }
    const newIsAnnual = !this.isAnnual
    this.shoppingCartService.priceModeToggled(newIsAnnual);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
