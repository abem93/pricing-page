import { Component, Input, OnInit } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-camera-product-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterModule],
  templateUrl: './camera-product-card.component.html',
  styleUrl: './camera-product-card.component.scss'
})
export class CameraProductCardComponent implements OnInit{
  @Input() camera: Camera = {
    name: '',
    price: 0,
    url: ''
  }
  selectedCamera = ''
  isSelected: boolean = false;
  
  constructor(private shoppingCartService: ShoppingCartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    });
  }

  addToShoppingCart(camera: Camera) {
    this.shoppingCartService.addItemToCart(camera);
    this.isSelected = true;
    this.selectedCamera = camera.name;
  }

  reduceItemQuantity(itemName: string) {
    this.shoppingCartService.reduceItemQuantity(itemName);
  }

  getItemQuantity(itemName: string): number {
    const item = this.shoppingCartService.getCartItem(itemName);
    return item && item.type === 'camera' ? item.quantity : 0;
  }
}