import { Component, OnInit } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-camera-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './camera-details.component.html',
  styleUrl: './camera-details.component.scss'
})
export class CameraDetailsComponent implements OnInit {
  camera: Camera = {
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  cameraName: string = '';
  cameraList: Camera[]=[]

  
  constructor(private planDetailsService:SubcriptionPlanDetailsService, private shoppingCartService: ShoppingCartService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cameraList = this.planDetailsService.getCameraList();
    this.route.paramMap.subscribe(params => {
      const name = params.get('id');
      if(name){
        this.cameraName = name;
        this.findCamera()
      }
    });
  }

  findCamera() {
    const cam = this.cameraList.find(cam => this.cameraName === cam.name);
    if(cam){
      this.camera = cam;

    }
  }

  addToShoppingCart(camera: Camera) {
    this.shoppingCartService.addItemToCart(camera);
    this.router.navigate(['/shop/cameras']);
  }
  onClose() {
    this.router.navigate(['/shop/cameras']);
  }
}
