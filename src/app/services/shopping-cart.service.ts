import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubscriptionPlan } from '../models/subscription-plan.model';
import { CartItem, SubscriptionCartItem, CameraCartItem, CaptureServiceCartItem } from '../models/cart-item-model';
import { Camera } from '../models/camera.model';
import { CaptureService } from '../models/capture-service.model';

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
      this.sortCart();
      this.shoppingCartSubject.next(this.cart);
    }
    const storedIsAnnual = localStorage.getItem('isAnnual');
    if (storedIsAnnual !== null) {
      this.isAnnualSubject.next(JSON.parse(storedIsAnnual));
    }
  }

  saveCartToStorage() {
    if (this.cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('isAnnual', JSON.stringify(this.isAnnualSubject.value));
    } else {
      localStorage.removeItem('cart');
      localStorage.removeItem('isAnnual');
    }
  }

  getSelectedPlan() {
    const selectedItem = this.cart.find(item => item.type === 'subscription') as SubscriptionCartItem | undefined;
    return selectedItem && selectedItem.spaces ? {
      name: selectedItem.selectedPlan.name,
      spaces: selectedItem.spaces
    } : null;
  }

  planSelectionChange(name: string) {
    this.planSelectedSubject.next(name);
  }

  addSubscriptionToCart(selectedPlan: SubscriptionPlan | undefined, spaces: number, annual: boolean) {
    if (!selectedPlan) return;
    this.cart = [{ type: 'subscription', selectedPlan, spaces, annual }, ...this.cart.filter(item => item.type !== 'subscription')];
    this.updateCart();
  }

  addItemToCart(camera: Camera) {
    const noCameraNeeded = camera.name === 'No Camera Needed';
    const existingItem = this.cart.find(item => item.type === 'camera' && (item as CameraCartItem).selectedCamera.name === camera.name) as CameraCartItem;

    if (noCameraNeeded) {
      this.cart = this.cart.filter(item => item.type !== 'camera');
    } else {
      this.cart = this.cart.filter(item => !(item.type === 'camera' && (item as CameraCartItem).selectedCamera.name === 'No Camera Needed'));
    }

    if (existingItem && !noCameraNeeded) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ type: 'camera', selectedCamera: camera, quantity: noCameraNeeded ? 0 : 1 });
    }

    this.sortCart();
    this.updateCart();
  }

  priceModeToggled(isAnnual: boolean) {
    this.isAnnualSubject.next(isAnnual);
    this.updateCartAnnualStatus(isAnnual);
  }

  updateCartAnnualStatus(isAnnual: boolean) {
    this.cart = this.cart.map(item => item.type === 'subscription' ? { ...item, annual: isAnnual } : item);
    this.updateCart();
  }

  addServiceToCart(service: CaptureService) {
    // remove any camera item that has a 'reason' of 'capture service'
    this.cart = this.cart.filter(item => 
      !(item.type === 'camera' && (item as CameraCartItem).selectedCamera.reason === 'Capture Services')
    );

    console.log(this.cart)
  
    // add the new service if it doesn't already exist
    if (!this.cart.some(item => 
      item.type === 'capture-service' && 
      (item as CaptureServiceCartItem).selectedService === service
    )) {
      this.cart.push({ type: 'capture-service', selectedService: service });
    }
  
    this.sortCart();
    this.updateCart();
  }

  removeItemFromCart(itemToRemove: string | SubscriptionPlan | Camera | CaptureService) {
    this.cart = this.cart.filter(item => {
      if (typeof itemToRemove === 'string') {
        if (itemToRemove.includes('_')) {
          const [name, levels, sqFeet] = itemToRemove.split('_');
          return !(item.type === 'capture-service' &&
            item.selectedService.name === name &&
            item.selectedService.levels.toString() === levels &&
            item.selectedService.sqFeet.toString() === sqFeet);
        }
        return (item.type === 'subscription' && item.selectedPlan.name !== itemToRemove) ||
               (item.type === 'camera' && item.selectedCamera.name !== itemToRemove);
      }
      return !(
        (item.type === 'subscription' && item.selectedPlan === itemToRemove) ||
        (item.type === 'camera' && item.selectedCamera === itemToRemove) ||
        (item.type === 'capture-service' && item.selectedService === itemToRemove)
      );
    });
    this.updateCart();
  }

  reduceItemQuantity(itemName: string) {
    const item = this.cart.find(item => item.type === 'camera' && item.selectedCamera.name === itemName) as CameraCartItem;
    if (item) {
      item.quantity > 1 ? item.quantity-- : this.removeItemFromCart(itemName);
      this.updateCart();
    }
  }

  updateCart() {
    this.shoppingCartSubject.next([...this.cart]);
    this.saveCartToStorage();
  }

  getCartItem(itemName: string) {
    return this.cart.find(item => 
      (item.type === 'camera' && item.selectedCamera.name === itemName) ||
      (item.type === 'capture-service' && item.selectedService.name === itemName)
    );
  }

  private sortCart() {
    this.cart.sort((a, b) => {
      if (a.type === 'subscription') return -1;
      if (b.type === 'subscription') return 1;
      if (a.type === 'camera' && b.type === 'capture-service') return -1;
      if (a.type === 'capture-service' && b.type === 'camera') return 1;
      return 0;
    });
  }
}