import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionPlanDetailsService {
  constructor() { }

  private subscriptionPlans = [
    {
      name: 'Pro', price: 2.4 , discountPrice: 2, users: 3, spaces: [5, 10, 15, 20], features: [
        "Remove Watermark",
        "Host your own tour",
        "Create Three Published Projects",
        "Share & embed and display projects anywhere",
        "Unlimited scenes and photos per project",
        "Scene types like 360 photos, 360 video, 2D images",
        "Access to a limited portfolio of demo tours",
      ],
    },
    {
      name: 'Pro Plus', price: 3.25, discountPrice: 2.75, users: 10, spaces: [20, 25, 30, 40, 50, 75, 100, 125, 150], features: [
        "Whitelabel / Bring your own URL",
        "Team Collaboration",
        "Tour Privacy Settings",
        "CloudPano Live in-tour Video Chat",
        "Google Street View Uploading",
      ]
    },
    {
      name: 'Enterprise', price: 3.21, discountPrice: 2.69, users: 50, spaces: [100, 125, 150, 200, 300],
      features: [
        "Custom Website Integrations",
        "Dedicated Account Manager",
        "Team Training and Onboarding",
        "On Location 360º Photography",
        "Enterprise Project Technology and Photography Collaboration",
        "Multiple Seats Discount"
      ]
    },
  ]

  getSubscriptionPlans() {
    return [...this.subscriptionPlans];
  }

}
