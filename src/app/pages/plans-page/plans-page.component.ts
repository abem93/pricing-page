import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { RouterOutlet } from '@angular/router';
import { PlanCardComponent } from '../../components/plan-card/plan-card.component';
import { PlanComparisonTableComponent } from '../../components/plan-comparison-table/plan-comparison-table.component';


@Component({
  selector: 'app-plans-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PlanCardComponent, PlanComparisonTableComponent],
  templateUrl: './plans-page.component.html',
  styleUrl: './plans-page.component.scss'
})
export class PlansPageComponent {
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
