import { Routes } from '@angular/router';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { PricingConfigComponent } from './pages/pricing-config/pricing-config.component';
import { PaidPlansTableComponent } from './pages/paid-plans-table/paid-plans-table.component';
import { CaptureServicesPageComponent } from './pages/capture-services-page/capture-services-page.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CaptureServiceOrderPageComponent } from './pages/capture-service-order-page/capture-service-order-page.component';
import { CameraDetailsComponent } from './components/camera-details/camera-details.component';
import { CaptureServicesCardComponent } from './components/capture-services-card/capture-services-card.component';
import { CameraListComponent } from './pages/camera-list/camera-list.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';


export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/plans'
      },
      { path: 'plans', component: PlansPageComponent },
      {
        path: 'shop', component: PricingConfigComponent,
        children: [
          { path: 'plans', component: PaidPlansTableComponent },
          { path: 'cameras', component: CameraListComponent },
          { path: 'products/:id', component: CameraDetailsComponent },
          {
            path: 'capture-services', component: CaptureServicesPageComponent,
            children: [
              { path: '', component: CaptureServicesCardComponent },
            ]
          }
        ]
      },
      {
        path: '', component: PricingConfigComponent,
        children: [
          { path: 'capture-services-order', component: CaptureServiceOrderPageComponent },
        ]
      },
      {
         path: 'cart-summary', component: CartSummaryComponent
      },
      { path: 'contact', component: ContactFormComponent },
    ],
  },
];

