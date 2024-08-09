import { Component } from '@angular/core';
import { CaptureServicesCardComponent } from '../../components/capture-services-card/capture-services-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-capture-services-page',
  standalone: true,
  imports: [CaptureServicesCardComponent, RouterModule],
  templateUrl: './capture-services-page.component.html',
  styleUrl: './capture-services-page.component.scss'
})
export class CaptureServicesPageComponent {
  
}
