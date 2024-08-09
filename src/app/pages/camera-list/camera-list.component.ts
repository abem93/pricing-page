import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcriptionPlanDetailsService } from '../../services/plan-details.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Camera } from '../../models/camera.model';
import { CameraProductCardComponent } from '../../components/camera-product-card/camera-product-card.component';

@Component({
  selector: 'app-camera-list',
  standalone: true,
  imports: [CommonModule, CameraProductCardComponent],
  templateUrl: './camera-list.component.html',
  styleUrl: './camera-list.component.scss'
})
export class CameraListComponent {
  cameraList: Camera[] = [];
  isSelected: boolean = false;
  selectedCamera: string = '';
  isOpen:boolean = false;
  selectedOption= '';

  constructor(private planDetailsService:SubcriptionPlanDetailsService, private shoppingCartService: ShoppingCartService){}

  ngOnInit() {
    this.cameraList = this.planDetailsService.getCameraList();
  }

  onOptionChange(value: string) {
    this.selectedOption = value;
  }

  onNext() {
    if(this.selectedOption === 'hire'){
      const description = 'Capture Services'
      this.addToShoppingCart(description)
    }else if(this.selectedOption === 'own'){
      const description = 'Already Own Camera'
      this.addToShoppingCart(description)
    }else{
      const description = 'SmartPhone'
      this.addToShoppingCart(description)
    }
    this.isOpen = false;
  }

  addToShoppingCart(option:string) {
    const camera:Camera = {
      name: 'No Camera Needed',
      price: 0,
      url: '',
    }
    camera.reason = option;
    this.shoppingCartService.addItemToCart(camera);
    this.isSelected = true;
    this.selectedCamera = camera.name;
  }
}
