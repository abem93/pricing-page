import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CartItem, SubscriptionCartItem, CameraCartItem, CaptureServiceCartItem } from '../../models/cart-item-model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Camera } from '../../models/camera.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  isOpen = false;
  shoppingCart: CartItem[] = [];
  totalBalance = 0;
  productTotal = 0;
  subscriptionTotal = 0;
  checkout = false;
  hasCamera = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.subscribeToShoppingCart();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  isPlanSelected(): boolean {
    return this.shoppingCart.some(item => this.isSubscriptionItem(item));
  }

  shouldDisplayButton(): boolean {
    const currentUrl = this.getCurrentUrl();
    const isPlanSelected = this.isPlanSelected();
    const isCaptureService = this.shoppingCart.some(item => {
      return item.type === 'capture-service';
    })
    
    const isCameraSelected = this.hasCamera;

    if (this.shoppingCart.length < 1) {
      return false;
    }

    if (currentUrl === '/shop/plans') {
      return isPlanSelected;
    }

    if (currentUrl === '/shop/cameras') {
      return isPlanSelected && isCameraSelected;
    }

    if (currentUrl === '/capture-services-order') {
      return isCaptureService;
    }
    
    else{
      return false
    }
   
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  addToCart(itemToAdd: Camera | CaptureServiceCartItem) {
    if ('selectedService' in itemToAdd) {
      // Remove the "No Camera" item if it exists and has reason "Capture Services"
      const noCameraItem = this.shoppingCart.find(item => 
        this.isCameraItem(item) && 
        item.selectedCamera.reason === 'Capture Services' && 
        item.selectedCamera.name.toLowerCase().includes('no camera needed')
      );
      if (noCameraItem && this.isCameraItem(noCameraItem)) {
        this.shoppingCartService.removeItemFromCart(noCameraItem.selectedCamera.name);
      }
      
      // Add the capture service item
      const captureServiceCamera: Camera = {
        name: itemToAdd.selectedService.name,
        price: itemToAdd.selectedService.price,
        url: '',  // Add appropriate URL here
        reason: 'Capture Services'
      };
      this.shoppingCartService.addItemToCart(captureServiceCamera);
    } else {
      // This is a Camera item
      this.shoppingCartService.addItemToCart(itemToAdd);
    }
    this.updateCartStatus();
  }

  removeFromCart(itemToRemove: CartItem) {
    let identifier: string;

    if (this.isSubscriptionItem(itemToRemove)) {
      identifier = itemToRemove.selectedPlan.name;
      this.shoppingCartService.planSelectionChange('');
    } else if (this.isCameraItem(itemToRemove)) {
      identifier = itemToRemove.selectedCamera.name;
    } else if (this.isCaptureServiceItem(itemToRemove)) {
      identifier = `${itemToRemove.selectedService.name}_${itemToRemove.selectedService.levels}_${itemToRemove.selectedService.sqFeet}`;
      
      // Add back the "No Camera" item when removing a capture service
      const noCameraItem: Camera = {
        name: 'No Camera',
        price: 0,
        url: '', 
        reason: 'Capture Services'
      };
      this.shoppingCartService.addItemToCart(noCameraItem);
    } else {

      return;
    }

    this.shoppingCartService.removeItemFromCart(identifier);
    this.updateCartStatus();
  }

  continueCheckout() {
    const routes = {
      paidPlans: '/shop/plans',
      cameras: '/shop/cameras',
      captureServiceForm: '/capture-services-order',
      captureServices: '/shop/capture-services'
    };

    this.isOpen = false;
    const currentUrl = this.router.url;

    if (currentUrl === routes.paidPlans) {
      this.router.navigate([routes.cameras]);
    } else if (currentUrl === routes.cameras) {
      this.router.navigate([this.checkout && this.hasCamera ? '/cart-summary' : routes.captureServices]);
    } else if (currentUrl === routes.captureServices) {
      this.router.navigate([routes.captureServiceForm]);
    } else if (currentUrl === routes.captureServiceForm) {
      this.router.navigate(['/cart-summary']);
    }
  }

  getTotalCartItemCount(): number {
    return this.shoppingCart.reduce((total, item) => 
      total + (this.isCameraItem(item) ? item.quantity : 1), 0);
  }

  getPrice(item: CartItem): number {
    if (this.isSubscriptionItem(item)) {
      const { spaces, annual, selectedPlan } = item;
      if (spaces && selectedPlan) {
        return spaces * (annual && selectedPlan.discountPrice ? selectedPlan.discountPrice * 12 : selectedPlan.price);
      }
    } else if (this.isCameraItem(item)) {
      return (item.selectedCamera.price || 0) * item.quantity;
    } else if (this.isCaptureServiceItem(item)) {
      return item.selectedService.price;
    }
    return 0;
  }

  getCurrentUrl(): string {
    return this.router.url;
  }

  private subscribeToRouterEvents() {
    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateCartStatus();
        }
      })
    );
  }

  private subscribeToShoppingCart() {
    this.subscriptions.push(
      this.shoppingCartService.shoppingCartSubject.subscribe(cart => {
        if (cart) {
          this.shoppingCart = cart;
          this.updateCartStatus();
        }
      })
    );
  }

  private updateCartStatus() {
    this.calculateTotals();
    
    const currentUrl = this.router.url;
    const hasCaptureService = this.shoppingCart.some(item => 
      this.isCameraItem(item) && item.selectedCamera.reason === 'Capture Services'
    );
    const hasNoCameraNeeded = this.shoppingCart.some(item =>
      this.isCameraItem(item) && 
      item.selectedCamera.reason === 'Capture Services' && 
      item.selectedCamera.name.toLowerCase().includes('no camera needed')
    );

    this.hasCamera = this.shoppingCart.some(item => 
      this.isCameraItem(item) && 
      (item.selectedCamera.reason !== 'Capture Services' || hasCaptureService)
    );


    this.checkout = currentUrl.endsWith('/capture-services-order') || 
      (currentUrl.endsWith('/shop/cameras') && this.hasCamera && !hasNoCameraNeeded);


  }

  private calculateTotals() {
    this.productTotal = this.shoppingCart
      .filter(this.isCameraItem)
      .reduce((total, item) => total + this.getPrice(item), 0);

    this.subscriptionTotal = this.shoppingCart
      .filter(this.isSubscriptionItem)
      .reduce((total, item) => total + this.getPrice(item), 0);

    this.totalBalance = this.shoppingCart.reduce((total, item) => total + this.getPrice(item), 0);
  }

  private isSubscriptionItem(item: CartItem): item is SubscriptionCartItem {
    return item.type === 'subscription';
  }

  private isCameraItem(item: CartItem): item is CameraCartItem {
    return item.type === 'camera';
  }

  private isCaptureServiceItem(item: CartItem): item is CaptureServiceCartItem {
    return item.type === 'capture-service';
  }
}