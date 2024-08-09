import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-services-card',
  standalone: true,
  imports: [],
  templateUrl: './capture-services-card.component.html',
  styleUrl: './capture-services-card.component.scss'
})
export class CaptureServicesCardComponent {

  constructor(private router: Router) { }

  navigateToOrder() {
    this.router.navigate(['capture-services-order']);
  }
}
