import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MinLengthValidator, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CaptureService } from '../../models/capture-service.model';


@Component({
  selector: 'app-capture-service-order-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './capture-service-order-page.component.html',
  styleUrl: './capture-service-order-page.component.scss'
})
export class CaptureServiceOrderPageComponent {
  isFormValid: boolean = false;
  captureForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService) {
    this.captureForm = this.formBuilder.group({
      numberOfLevels: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      squareFeet: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      zipCode: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{5}(-[0-9]{4})?$'),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]]
    });
  }


  onZipCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove all non-numbers
    let value = input.value.replace(/\D/g, ''); 
    
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }

    value = value.slice(0, 10);
    input.value = value;
    this.captureForm.get('zipCode')?.setValue(value, {emitEvent: false});
  }


  addCaptureServiceToCart(){
    const service: CaptureService ={
      name: 'Capture Service',
      price: 238,
      levels: this.captureForm.value.numberOfLevels,
      sqFeet: this.captureForm.value.squareFeet,
      zipCode: +this.captureForm.value.zipCode
    }

    if(this.captureForm){
       this.shoppingCartService.addServiceToCart(service)
    }
  }

}
