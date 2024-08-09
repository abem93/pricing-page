import { Component, Input, OnDestroy, OnInit,  } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';



@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss'
})
export class PlanCardComponent {
  planDetails:SubscriptionPlan[]=[];
  @Input() planType: SubscriptionPlan = {
    name: '',
    target:'',
    price: 0,
    discountPrice: 0,
    users: 0,
    spaces: [],
    features: []
  }
  @Input() isAnnual = true;

  constructor(private planDetailsService:SubcriptionPlanDetailsService, private shoppingCartService:ShoppingCartService, private router: Router){}

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
  planSelected(planType:any){
    if (planType.name === 'Free') {
      window.open('https://app.cloudpano.com/signup', '_self');
    }else if(planType.name === 'Enterprise'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/contact']);
    }else{
      this.shoppingCartService.addSubscriptionToCart(planType, planType.spaces[0], this.isAnnual);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/shop/plans']);
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
