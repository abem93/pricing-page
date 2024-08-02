import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart-item-model';
import { SubscriptionPlan } from '../models/subscription-plan.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  selectedPlanName: string | null = null;
  shoppingCart: CartItem[] = [];
  totalBalance = 0;

  private subscriptions: Subscription[] = []

  constructor(private shoppingCartService: ShoppingCartService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingCartService.planSelectedSubject.subscribe((planName) => {
        if (!planName)
          this.selectedPlanName = planName;
        // Detect changes after change detection cycle
        this.cdr.detectChanges();
      })
    )


    this.shoppingCartService.shoppingCartSubject.subscribe((cart: CartItem[]) => {
      if (!cart) {
        return;
      }
      this.shoppingCart = cart
      cart.forEach((item) => this.getPrice(item))
      // Detect changes after change detection cycle
      this.cdr.detectChanges();
    })
  }

  removeFromCart(itemToRemove: CartItem) {
    this.shoppingCartService.removeItemFromCart(itemToRemove.selectedPlan.name)

    // If you want to clear the selected plan after removal
    this.shoppingCartService.planSelectionChange('');
  }
  getPrice(item: CartItem) {
    if (!item || !item.selectedPlan) {
      return 0;
    }
    if (item && item.annual && item.selectedPlan.discountPrice) {
      const annualPrice = (item.spaces * item.selectedPlan.discountPrice * 12)
      this.totalBalance = annualPrice
      return annualPrice
    }
    if (item && !item.annual && item.selectedPlan.price) {
      const monthlyPrice = (item.spaces * item.selectedPlan.price)
      this.totalBalance = monthlyPrice
      return monthlyPrice
    }
    return 0
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
