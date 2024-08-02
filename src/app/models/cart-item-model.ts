import { SubscriptionPlan } from './subscription-plan.model';

export interface CartItem {
  selectedPlan: SubscriptionPlan;
  spaces: number;
  annual: boolean;
}