import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {

}
