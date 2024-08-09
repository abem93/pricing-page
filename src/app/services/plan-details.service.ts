import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SubcriptionPlanDetailsService {
  constructor() { }

  private subscriptionPlans = [
    {
      name: 'Free', target: 'Easiest way to try CloudPano. No credit card needed.', price: 0, discountPrice: 0, users: 2, spaces: [1], features: [
        "Create immersive 3D experiences",
        "Capture on mobile, share on CloudPano",
        "Take accurate measurements, label objects and rooms",
        "Property Intelligence view & edit NEW",
        "Automatically generate photo galleries & tour highlights",
        "Create tags with images and attachments",
        "VR ready",
        "Play with CloudPano",
        "Build Tours",
        "Free to try"
      ]
    },
    {
      name: 'Pro', target: 'Individuals or small businesses that need all of the essential features.', price: 2.4, discountPrice: 2, users: 3, spaces: [5, 10, 15, 20], features: [
        "Remove Watermark",
        "Host your own tour",
        "Create Three Published Projects",
        "Share & embed and display projects anywhere",
        "Unlimited scenes and photos per project",
        "Scene types like 360 photos, 360 video, 2D images",
        "Access to a limited portfolio of demo tours",
      ],
    },
    {
      name: 'Pro Plus', target:'Small businesses and teams that need more advanced functionality.', price: 3.25, discountPrice: 2.75, users: 10, spaces: [20, 25, 30, 40, 50, 75, 100, 125, 150], features: [
        "Whitelabel / Bring your own URL",
        "Team Collaboration",
        "Tour Privacy Settings",
        "CloudPano Live in-tour Video Chat",
        "Google Street View Uploading",
      ]
    },
    {
      name: 'Business', target:'Businesses that need more spaces, collaboration, and integration capabilities.', price: 3.21, discountPrice: 2.69, users: 50, spaces: [100, 125, 150, 200, 300],
      features: [
        "Custom Website Integrations",
        "Dedicated Account Manager",
        "Team Training and Onboarding",
        "On Location 360º Photography",
        "Enterprise Project Technology and Photography Collaboration",
        "Multiple Seats Discount"
      ]
    },
    {
      name: 'Enterprise', target:'Organizations that need enterprise-grade features, scale, reporting and support.', price: 101, discountPrice: 100, users: 150, spaces: [400, 1000], features: [
        "SAML Single Sign-On for scalable user access",
        "Volume discount pricing for Schematic Floor Plans",
        "5 TB attachment data for large team collaboration",
        "Access to robust APIs/SDKs for large-scale automation & integrations",
        "Centralized account admin with audit logs and enterprise reporting",
        "Capture Services Technicians to scan your Spaces—in 700 cities",
        "Access to customer success manager & enterprise-level tech support"
      ]
    }
  ]

  private cameraList = [
    { name: 'Ricoh Theta Z1', price: 1149.99, url: 'https://www.coolthings.com/wp-content/uploads/2019/03/ricoh-theta-z1-1.jpg', description: 'The newly-developed lens unit and large-format image sensor delivers high-definition 360° images for photographers who never compromise on the quality. RAW recording is also supported for the ultimate in image quality. Unprecedented levels of 360° expression has begun.', features: [
      "With RICOH THETA Z1, you can capture 23 megapixel high-definition 360° images. In regular shooting, THETA Z1 automatically corrects highlights so that overexposed areas are effectively handled even in high contrast outdoor scenes, delivering superb resolution.",
      "In addition to conventional JPEG images, this model can record in RAW (DNG) + JPEG format for authentic coloring and image quality editing just like a digital SLR camera.",
      "A high-end magnesium alloy delivering durability in a lightweight body. The beautiful organic EL panel displays important shooting information at a glance. The design is throughly pursued to meet it's slim, compact form. This is truly the inception of a 360° camera that brings you a joy to own."
    ] },
    { name: 'Ricoh  Theta X', price:  799.99, url: 'https://us.ricoh-imaging.com/wp-content/uploads/2022/01/theta-x-prod-2.png', description: 'Shoot incredibly realistic spherical images and videos using video shooting with improved image stabilization at up to 5.7K, 30fps video. Devices that can play back the video may differ depending on the video resolution.', features: ['Record natural 360-degree images using up to approximately 60MP (11008 x 5504, 11K) still image shooting and high-precision stitching.', 'Has a magnesium alloy body that is both durable and feels high-end.','Achieves wireless high-speed transfer of still images and videos to a smartphone.', 'Due to the built-in GPS (QZSS) and A-GPS, accurate position information can be acquired to embed into 360-degree photos.', 'Supports an external memory card in addition to the internal memory capacity. Also supports shooting for a long period of time because the battery is replaceable.']},
    { name: 'Mobile VR Rotator Kit', price: 119.99, url: 'https://view.cloudpanore.com/hosted/images/a1/0cbbcea80b4c0786a594d4b74380e6/vr-kit-picture-cloudpano.png', description: 'Use Auto Rotator For Crisp 360º Photos', features: ['Take 360º Photos Directly From Your Phone', 'Simply attach the kit to your tripod, position the included lens to your phone and let the Kit do its magic! ', 'Image quality depends on the quality of your mobile phone, but if you have a good phone that is at most 2 years old, the quality will astound you, as it did us! ']}
  ]

  getSubscriptionPlans() {
    return [...this.subscriptionPlans];
  }

  getCameraList(){
    return [...this.cameraList]
  }

}
