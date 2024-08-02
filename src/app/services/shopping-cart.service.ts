import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubscriptionPlan } from '../models/subscription-plan.model';
import { CartItem } from '../models/cart-item-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  planSelectedSubject = new Subject<string>();
  shoppingCartSubject = new BehaviorSubject<CartItem[]>([]);
  isAnnualSubject = new BehaviorSubject<boolean>(true);

  private cart: CartItem[] = [];

  constructor() {
    this.loadCartFromStorage();
  }

  loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.shoppingCartSubject.next(this.cart);
    }

    const storedIsAnnual = localStorage.getItem('isAnnual');
    if (storedIsAnnual) {
      this.isAnnualSubject.next(JSON.parse(storedIsAnnual));
    }
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('isAnnual', JSON.stringify(this.isAnnualSubject.value));
  }

  getSelectedPlan(): { name: string, spaces: number } | null  {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart: CartItem[] = JSON.parse(storedCart);
      const selectedItem = cart.find(item => item.hasOwnProperty('selectedPlan'));
      if (selectedItem) {
        return { 
          name: selectedItem.selectedPlan.name, 
          spaces: selectedItem.spaces 
        };
      }
    }
    return null;
  }

  planSelectionChange(name: string) {
    this.planSelectedSubject.next(name);
  }

  addSubscriptionToCart(selectedPlan: SubscriptionPlan | undefined, spaces: number, annual: boolean) {
    if (!selectedPlan) {
      return;
    }

    const newItem: CartItem = { selectedPlan, spaces, annual };

    const existingItemIndex = this.cart.findIndex(item =>
      item.selectedPlan?.name === selectedPlan.name
    );

    if (existingItemIndex !== -1) {
      // If the same plan exists, replace it
      this.cart[existingItemIndex] = newItem;
    } else {
      // If no matching plan exists, add the new item
      this.cart = this.cart.filter(item =>
        !(item.hasOwnProperty('selectedPlan') &&
          item.hasOwnProperty('spaces') &&
          item.hasOwnProperty('annual'))
      ); // Remove any existing plan item
      this.cart.push(newItem);
    }

    this.updateCart();
    this.saveCartToStorage();
  }

  priceModeToggled(isAnnual: boolean) {
    this.isAnnualSubject.next(isAnnual);
    this.updateCartAnnualStatus(isAnnual);
  }

  updateCartAnnualStatus(isAnnual: boolean) {
    this.cart = this.cart.map(item => ({ ...item, annual: isAnnual }));
    this.updateCart();
    this.saveCartToStorage();
  }
  removeItemFromCart(planName: string) {
    this.cart = this.cart.filter(item => item.selectedPlan?.name !== planName);
    this.updateCart();
    this.saveCartToStorage();
  }

  updateCart() {
    this.shoppingCartSubject.next([...this.cart]);
    this.saveCartToStorage();
  }
}