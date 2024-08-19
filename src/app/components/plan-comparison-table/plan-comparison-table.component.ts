import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { PlanComparisonTableDetails } from '../../models/planComparisonTable.model';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';


@Component({
  selector: 'app-plan-comparison-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-comparison-table.component.html',
  styleUrl: './plan-comparison-table.component.scss'
})
export class PlanComparisonTableComponent implements OnInit {
  isExpanded = false;
  plans: SubscriptionPlan[] =[]
  planDetails: PlanComparisonTableDetails[] = [
  ]

  constructor(private planDetailsService:SubcriptionPlanDetailsService, private router:Router, private shoppingCartService:ShoppingCartService){
    
  }

  ngOnInit(): void {
    this.planDetails = this.planDetailsService.getPlanTableDetails();
    this.plans = this.planDetailsService.getSubscriptionPlans();
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.planDetails.map(item => item.category))];
  }

  getItemsByCategory(category: string): any[] {
    return this.planDetails.filter(item => item.category === category);
  }

  planSelected(planType:any){
    console.log(planType)
    if (planType === 'Free') {
      window.open('https://app.cloudpano.com/signup', '_self');
    }else if(planType === 'Enterprise'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/contact']);
    }else{
      const selectedPlan = this.findPlan(planType)
      if(selectedPlan){
        this.shoppingCartService.addSubscriptionToCart(selectedPlan, selectedPlan.spaces[0], true);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/shop/plans']);
    }
  }
  formatPlanName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim();
  }

  findPlan(name:string){
    return this.plans.find(item => item.name == name)
  }
  

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}

