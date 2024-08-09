import { SubscriptionPlan } from './subscription-plan.model';
import { Camera } from './camera.model';
import { CaptureService } from './capture-service.model';

export interface SubscriptionCartItem {
  type: 'subscription';
  selectedPlan: SubscriptionPlan;
  spaces: number;
  annual: boolean;
}

export interface CameraCartItem {
  type: 'camera';
  selectedCamera: Camera;
  quantity: number;
}

export interface CaptureServiceCartItem{
  type: 'capture-service';
  selectedService: CaptureService;
}

export type CartItem = SubscriptionCartItem | CameraCartItem | CaptureServiceCartItem;