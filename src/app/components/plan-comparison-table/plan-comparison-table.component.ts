import { Component, Input } from '@angular/core';
import { SubscriptionPlan } from '../../models/subscription-plan.model';


@Component({
  selector: 'app-plan-comparison-table',
  standalone: true,
  imports: [],
  templateUrl: './plan-comparison-table.component.html',
  styleUrl: './plan-comparison-table.component.scss'
})
export class PlanComparisonTableComponent {
  @Input() planType: SubscriptionPlan= {
    name: '',
    target: '',
    price: 0,
    discountPrice: 0,
    users: 0,
    spaces: [],
    features: []
  }
}
