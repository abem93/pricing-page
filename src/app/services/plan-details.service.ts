import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SubcriptionPlanDetailsService {
  constructor() { }

  private subscriptionPlans = [
    {
      name: 'Free', target: 'Easiest way to try CloudPano. No credit card needed.', price: 0, discountPrice: 0, users: 1, spaces: [1], features: [
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

  private planComparisonTableDetails = [
    {
      category: "AT A GLANCE",
      feature: "Publish your tour so others can see it",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "AT A GLANCE",
      feature: "# of published tours",
      freePlan: false,
      proPlan: "5-10",
      proPlusPlan: "20-150",
      businessPlan: "100-300",
      enterprisePlan: "Custom"
    },
    {
      category: "THE BASICS",
      feature: "Unlimited Unpublished tours",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "THE BASICS",
      feature: "Create Projects of any type",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "THE BASICS",
      feature: "Unlimited Scenes Per Tour",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "THE BASICS",
      feature: "8K Resolution",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "THE BASICS",
      feature: "CloudFlare Content Delivery Network (CDN)",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Embed Floorplans",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Embed Dollhouse and 3D Models",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom Scene Transitions",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Set Initial Views of Scenes",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Clone Tours",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom Themes",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom Hotspot Icons",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom Logos and Branding",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Ambient Sounds and Music",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Hide Scenes from Ribbon",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Embed YouTube and Rich Media",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Link to External Websites",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Nadir Patch",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Limit Horizontal View",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Auto Linkback for Hotspots",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Full Mobile Workflow",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Reorder Scenes (Sort by Name and Date)",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Mobile VR Headset Compatible",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Oculus Compatible (Immersive VR)",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Share on Social Media",
      freePlan: "Coming Soon",
      proPlan: "Coming Soon",
      proPlusPlan: "Coming Soon",
      businessPlan: "Coming Soon",
      enterprisePlan: "Coming Soon"
    },
    {
      category: "TONS OF FEATURES",
      feature: "Remove CloudPano Watermark",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Whitelabel your Tours",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Bring your own Domain",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Privacy Settings",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Password Protect Tours",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Upload to Google Street View",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Limit Tour Sharing Options",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom CSS",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Custom Javascript",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Google Analytics",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Add Chatbots and Custom calls-to-action",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Lead Generation tool",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Book Showings feature",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Calendly Integration",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Collections - Combine Tours into one URL",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "MLS Compliant (Real Estate Tours)",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TONS OF FEATURES",
      feature: "Optional Live Video Chat",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Embed anywhere using iFrame",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Embed anywhere using Javascript",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish to Google Street View",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish to Realtor.com",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish to MLS",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish to Wordpress",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish Collections of Tours into one URL",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Download and Archive your Tours",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Host Tours on your own Server",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SHARING",
      feature: "Publish to Dealer.com, DealerOn, eDealer.ca, Dealer Inspire, Dealer Spike, Dealercenter and more…",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "360 Panoramas",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "360 Video Panoramas",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "2D Slideshow Scenes",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Outside-In 360 (Exterior Spins)",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "eCommerce Product 360 Spins",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Automotive Exterior Spins",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "2D Vehicle Detail Photos (Automotive)",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Dollhouse View",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Tiny Planet View",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Floorplan View",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Google Street View Scenes",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TYPES OF SCENES",
      feature: "Side-by-side Panoramas",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TEAM COLLABORATION",
      feature: "# of User Accounts",
      freePlan: "1",
      proPlan: "3+",
      proPlusPlan: "10+",
      businessPlan: "50+",
      enterprisePlan: "Custom"
    },
    {
      category: "TEAM COLLABORATION",
      feature: "Share your Tours in Teams",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TEAM COLLABORATION",
      feature: "Work on Tours with Colleagues",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TEAM COLLABORATION",
      feature: "Manage Team Membership",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TEAM COLLABORATION",
      feature: "Manage Teammember Permissions",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "TEAM COLLABORATION",
      feature: "Role-based Accounts (Client/Creator, etc)",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "MOBILE COMPANION APPS",
      feature: "Virtual Tour Creator App",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "MOBILE COMPANION APPS",
      feature: "Automotive Spin Creator (iOS/Android)",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "MOBILE COMPANION APPS",
      feature: "Optional Phone Rotator and Fisheye lens",
      freePlan: "$119",
      proPlan: "$119",
      proPlusPlan: "Optional Phone Rotator and Fisheye lens $95",
      businessPlan: "Optional Phone Rotator and Fisheye lens $95",
      enterprisePlan: "Optional Phone Rotator and Fisheye lens $95"
    },
    {
      category: "MOBILE COMPANION APPS",
      feature: "Floor Plan Scanner Lidar App",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Live Video chat on Mobile and Desktop",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Host meetings in 360",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Markup Scenes with Drawing Tool",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Guide Viewers as you Navigate Tour",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Host and Participant Roles for Meetings",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Full screen Video Chat",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "CLOUDPANO LIVE VIDEO CHAT",
      feature: "Share your screen",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "DEMO TOURS",
      feature: "Browse CloudPano Community Tours",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "DEMO TOURS",
      feature: "Free Demo Tours to use in your Portfolio",
      freePlan: false,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "ADD-ONS",
      feature: "API Access",
      freePlan: false,
      proPlan: false,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "ADD-ONS",
      feature: "Order GLA-Compliant Floorplans",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: 'Volume discount available'
    },
    {
      category: "ADD-ONS",
      feature: "Order Dollhouse Models",
      freePlan: '$1.65 per scene',
      proPlan: '$1.65 per scene',
      proPlusPlan: '$1.65 per scene',
      businessPlan: '$1.65 per scene',
      enterprisePlan: 'Volume discount available'
    },
    {
      category: "ADD-ONS",
      feature: "Order Tour Creation Services",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: 'Volume discount available'
    },
    {
      category: "ADD-ONS",
      feature: "Background Removal for Automotive Spins",
      freePlan: false,
      proPlan: false,
      proPlusPlan: false,
      businessPlan: true,
      enterprisePlan: 'Volume discount available'
    },
    {
      category: "ADD-ONS",
      feature: "Custom Development and Code",
      freePlan: false,
      proPlan: false,
      proPlusPlan: false,
      businessPlan: false,
      enterprisePlan: true
    },
    {
      category: "SUPPORT",
      feature: "FREE 15-min Product Success Demos",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SUPPORT",
      feature: "8am - 5pm US Central time Chat Support Mon-Fri",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SUPPORT",
      feature: "8am - 5pm US Central time Phone Support Mon-Fri",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SUPPORT",
      feature: "Named Customer Success Manager",
      freePlan: false,
      proPlan: false,
      proPlusPlan: false,
      businessPlan: true,
      enterprisePlan: true
    },
    {
      category: "SUPPORT",
      feature: "Access to Facebook Community",
      freePlan: true,
      proPlan: true,
      proPlusPlan: true,
      businessPlan: true,
      enterprisePlan: true
    }
  ]

  getSubscriptionPlans() {
    return [...this.subscriptionPlans];
  }

  getCameraList(){
    return [...this.cameraList]
  }

  getPlanTableDetails(){
    return [...this.planComparisonTableDetails]
  }

}
