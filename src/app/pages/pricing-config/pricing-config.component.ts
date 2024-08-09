import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-pricing-config',
  standalone: true,
  imports: [RouterModule, CartComponent, CommonModule],
  templateUrl: './pricing-config.component.html',
  styleUrl: './pricing-config.component.scss'
})
export class PricingConfigComponent implements OnInit {
  isOpen = true;

  constructor(private router:Router){}
  isPlansPage:boolean| null = true;
  isCaptureService:boolean = false;
  
  ngOnInit() {
    this.checkRoute();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.checkRoute());
  }

  checkRoute() {
    this.isPlansPage = this.router.url.endsWith('/shop/plans');
    this.isCaptureService = this.router.url.endsWith('/capture-services-order');
  }
  
}
