export interface Photographer {
  id: string;
  name: string;
  email: string;
  shootTypes: string[];
  experience: string;
  rating: number;
  reviewCount: number;
  description: string;
  camera: string;
  sessionsCompleted: number;
  hourlyRate: number;
  portfolios: string[];
  packages: Package[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export const photographers: Photographer[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@bookmysnap.com",
    shootTypes: ["Wedding", "Portrait"],
    experience: "8+ years",
    rating: 4.9,
    reviewCount: 127,
    description: "Specializing in capturing timeless wedding moments and intimate portraits with a blend of traditional and contemporary styles.",
    camera: "Canon EOS R6 Mark II",
    sessionsCompleted: 485,
    hourlyRate: 2500,
    portfolios: ["photo-1606216794074-735e91aa2c92", "photo-1519741497674-611481863552"],
    packages: [
      { id: "1a", name: "Basic", price: 15000, duration: "4 hours", features: ["150 edited photos", "Online gallery", "Basic retouching"] },
      { id: "1b", name: "Premium", price: 25000, duration: "8 hours", features: ["300 edited photos", "Online gallery", "Advanced retouching", "Same day highlights"], popular: true },
      { id: "1c", name: "Gold", price: 40000, duration: "Full day", features: ["500+ edited photos", "Premium gallery", "Cinematic video", "Album included"] }
    ]
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@bookmysnap.com",
    shootTypes: ["Fashion", "Portrait"],
    experience: "6+ years",
    rating: 4.8,
    reviewCount: 89,
    description: "Fashion and portrait photographer with an eye for capturing personality and style. Known for creative lighting and composition.",
    camera: "Sony α7R V",
    sessionsCompleted: 342,
    hourlyRate: 3000,
    portfolios: ["photo-1469334031218-e382a71b716b", "photo-1524504388940-b1c1722653e1", "photo-1531746020798-e6953c6e8e04"],
    packages: [
      { id: "2a", name: "Basic", price: 12000, duration: "3 hours", features: ["100 edited photos", "Online gallery", "Basic styling tips"] },
      { id: "2b", name: "Premium", price: 22000, duration: "6 hours", features: ["200 edited photos", "Professional styling", "Location scouting", "Priority editing"], popular: true },
      { id: "2c", name: "Gold", price: 35000, duration: "Full day", features: ["300+ edited photos", "Multiple locations", "Wardrobe consultation", "Portfolio creation"] }
    ]
  },
  {
    id: "3",
    name: "Rohit Kapoor",
    email: "rohit.kapoor@bookmysnap.com",
    shootTypes: ["Event", "Real Estate"],
    experience: "5+ years",
    rating: 4.7,
    reviewCount: 156,
    description: "Event and real estate specialist delivering high-quality commercial photography with quick turnaround times.",
    camera: "Nikon Z9",
    sessionsCompleted: 398,
    hourlyRate: 2000,
    portfolios: ["photo-1519389950473-47ba0277781c", "photo-1560518883-ce09059eeffa", "photo-1496307653780-42ee777d4833"],
    packages: [
      { id: "3a", name: "Basic", price: 8000, duration: "3 hours", features: ["75 edited photos", "Same day delivery", "Basic editing"] },
      { id: "3b", name: "Premium", price: 15000, duration: "6 hours", features: ["150 edited photos", "Priority delivery", "Advanced editing", "Drone shots"], popular: true },
      { id: "3c", name: "Gold", price: 25000, duration: "Full day", features: ["250+ edited photos", "Video highlights", "Multiple formats", "Commercial license"] }
    ]
  },
  {
    id: "4",
    name: "Sneha Patel",
    email: "sneha.patel@bookmysnap.com",
    shootTypes: ["Product", "Fashion"],
    experience: "7+ years",
    rating: 4.9,
    reviewCount: 203,
    description: "Product and commercial fashion photographer with expertise in e-commerce and brand photography.",
    camera: "Canon EOS R5",
    sessionsCompleted: 567,
    hourlyRate: 2800,
    portfolios: ["photo-1441986300917-64674bd600d8", "photo-1560472354-b33ff0c44a43", "photo-1469334031218-e382a71b716b"],
    packages: [
      { id: "4a", name: "Basic", price: 10000, duration: "4 hours", features: ["50 product shots", "White background", "Basic retouching"] },
      { id: "4b", name: "Premium", price: 18000, duration: "6 hours", features: ["100 product shots", "Multiple backgrounds", "Advanced editing", "Lifestyle shots"], popular: true },
      { id: "4c", name: "Gold", price: 30000, duration: "Full day", features: ["200+ shots", "Creative concepts", "Model coordination", "Brand consultation"] }
    ]
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@bookmysnap.com",
    shootTypes: ["Wedding", "Event"],
    experience: "10+ years",
    rating: 4.8,
    reviewCount: 178,
    description: "Veteran wedding and event photographer with a documentary style approach, capturing candid moments beautifully.",
    camera: "Sony α7 IV",
    sessionsCompleted: 623,
    hourlyRate: 3500,
    portfolios: ["photo-1519741497674-611481863552", "photo-1606216794074-735e91aa2c92"],
    packages: [
      { id: "5a", name: "Basic", price: 20000, duration: "6 hours", features: ["200 edited photos", "Online gallery", "Candid coverage"] },
      { id: "5b", name: "Premium", price: 35000, duration: "10 hours", features: ["400 edited photos", "Video highlights", "Two photographers", "Album design"], popular: true },
      { id: "5c", name: "Gold", price: 55000, duration: "Full event", features: ["600+ photos", "Cinematic film", "Same day edit", "Premium album"] }
    ]
  },
  {
    id: "6",
    name: "Ananya Desai",
    email: "ananya.desai@bookmysnap.com",
    shootTypes: ["Portrait", "Fashion"],
    experience: "4+ years",
    rating: 4.6,
    reviewCount: 94,
    description: "Creative portrait and fashion photographer with a modern aesthetic and vibrant editing style.",
    camera: "Fujifilm X-T5",
    sessionsCompleted: 267,
    hourlyRate: 2200,
    portfolios: ["photo-1507003211169-0a1dd7228f2d", "photo-1544005313-94ddf0286df2", "photo-1438761681033-6461ffad8d80"],
    packages: [
      { id: "6a", name: "Basic", price: 9000, duration: "2 hours", features: ["60 edited photos", "Online gallery", "Creative editing"] },
      { id: "6b", name: "Premium", price: 16000, duration: "4 hours", features: ["120 edited photos", "Multiple looks", "Professional makeup tips", "Social media package"], popular: true },
      { id: "6c", name: "Gold", price: 28000, duration: "Full day", features: ["200+ photos", "Multiple locations", "Wardrobe styling", "Video content"] }
    ]
  },
  {
    id: "7",
    name: "Karan Joshi",
    email: "karan.joshi@bookmysnap.com",
    shootTypes: ["Real Estate", "Product"],
    experience: "6+ years",
    rating: 4.7,
    reviewCount: 134,
    description: "Architectural and product photography specialist with expertise in luxury real estate and high-end product shoots.",
    camera: "Canon EOS R6",
    sessionsCompleted: 445,
    hourlyRate: 2400,
    portfolios: ["photo-1527576539890-dfa815648363", "photo-1488972685288-c3fd157d7c7a", "photo-1487958449943-2429e8be8625"],
    packages: [
      { id: "7a", name: "Basic", price: 7000, duration: "3 hours", features: ["40 edited photos", "HDR processing", "Quick delivery"] },
      { id: "7b", name: "Premium", price: 14000, duration: "5 hours", features: ["80 edited photos", "Drone shots", "Virtual tour ready", "Floor plans"], popular: true },
      { id: "7c", name: "Gold", price: 24000, duration: "Full day", features: ["120+ photos", "Video walkthrough", "360° views", "Marketing package"] }
    ]
  },
  {
    id: "8",
    name: "Ritu Agarwal",
    email: "ritu.agarwal@bookmysnap.com",
    shootTypes: ["Wedding", "Portrait"],
    experience: "9+ years",
    rating: 4.9,
    reviewCount: 211,
    description: "Elegant wedding and portrait photographer specializing in capturing emotions and creating timeless memories.",
    camera: "Nikon Z7 II",
    sessionsCompleted: 578,
    hourlyRate: 3200,
    portfolios: ["photo-1531746020798-e6953c6e8e04", "photo-1507003211169-0a1dd7228f2d", "photo-1544005313-94ddf0286df2"],
    packages: [
      { id: "8a", name: "Basic", price: 18000, duration: "5 hours", features: ["180 edited photos", "Online gallery", "Emotional storytelling"] },
      { id: "8b", name: "Premium", price: 32000, duration: "8 hours", features: ["350 edited photos", "Same day highlights", "Guest photography", "Creative portraits"], popular: true },
      { id: "8c", name: "Gold", price: 50000, duration: "Multi-day", features: ["500+ photos", "Pre-wedding shoot", "Album design", "Family portraits"] }
    ]
  },
  {
    id: "9",
    name: "Amit Kumar",
    email: "amit.kumar@bookmysnap.com",
    shootTypes: ["Event", "Product"],
    experience: "5+ years",
    rating: 4.6,
    reviewCount: 112,
    description: "Corporate event and product photographer with a professional approach and attention to brand consistency.",
    camera: "Sony α7 III",
    sessionsCompleted: 334,
    hourlyRate: 2100,
    portfolios: ["photo-1519741497674-611481863552", "photo-1441986300917-64674bd600d8", "photo-1560472354-b33ff0c44a43"],
    packages: [
      { id: "9a", name: "Basic", price: 9500, duration: "4 hours", features: ["100 edited photos", "Event coverage", "Basic editing"] },
      { id: "9b", name: "Premium", price: 17000, duration: "6 hours", features: ["180 edited photos", "Live social media", "Professional lighting", "Quick delivery"], popular: true },
      { id: "9c", name: "Gold", price: 28000, duration: "Full event", features: ["300+ photos", "Video coverage", "Same day edit", "Brand alignment"] }
    ]
  },
  {
    id: "10",
    name: "Divya Malhotra",
    email: "divya.malhotra@bookmysnap.com",
    shootTypes: ["Fashion", "Portrait"],
    experience: "7+ years",
    rating: 4.8,
    reviewCount: 167,
    description: "Fashion and editorial photographer with a distinct style and expertise in high-fashion and commercial shoots.",
    camera: "Canon EOS R3",
    sessionsCompleted: 456,
    hourlyRate: 3400,
    portfolios: ["photo-1524504388940-b1c1722653e1", "photo-1438761681033-6461ffad8d80", "photo-1469334031218-e382a71b716b"],
    packages: [
      { id: "10a", name: "Basic", price: 14000, duration: "3 hours", features: ["80 edited photos", "Studio setup", "Basic styling"] },
      { id: "10b", name: "Premium", price: 26000, duration: "6 hours", features: ["160 edited photos", "Professional styling", "Multiple looks", "Editorial quality"], popular: true },
      { id: "10c", name: "Gold", price: 42000, duration: "Full day", features: ["250+ photos", "Concept development", "Team coordination", "Portfolio ready"] }
    ]
  },
  {
    id: "11",
    name: "Rajesh Verma",
    email: "rajesh.verma@bookmysnap.com",
    shootTypes: ["Real Estate", "Event"],
    experience: "8+ years",
    rating: 4.7,
    reviewCount: 189,
    description: "Real estate and corporate event specialist with expertise in architectural photography and professional events.",
    camera: "Nikon Z6 II",
    sessionsCompleted: 512,
    hourlyRate: 2600,
    portfolios: ["photo-1518005020951-eccb494ad742", "photo-1496307653780-42ee777d4833", "photo-1449157291145-7efd050a4d0e"],
    packages: [
      { id: "11a", name: "Basic", price: 8500, duration: "3 hours", features: ["50 edited photos", "HDR processing", "Basic editing"] },
      { id: "11b", name: "Premium", price: 16500, duration: "6 hours", features: ["100 edited photos", "Drone coverage", "Twilight shots", "Virtual tour"], popular: true },
      { id: "11c", name: "Gold", price: 27000, duration: "Full day", features: ["150+ photos", "Video content", "Marketing materials", "3D tour"] }
    ]
  },
  {
    id: "12",
    name: "Meera Reddy",
    email: "meera.reddy@bookmysnap.com",
    shootTypes: ["Wedding", "Event"],
    experience: "6+ years",
    rating: 4.8,
    reviewCount: 143,
    description: "Wedding and celebration photographer with a joyful approach to capturing life's most precious moments.",
    camera: "Sony α7R IV",
    sessionsCompleted: 389,
    hourlyRate: 2900,
    portfolios: ["photo-1606216794074-735e91aa2c92", "photo-1519741497674-611481863552"],
    packages: [
      { id: "12a", name: "Basic", price: 16000, duration: "4 hours", features: ["150 edited photos", "Ceremony coverage", "Family portraits"] },
      { id: "12b", name: "Premium", price: 28000, duration: "8 hours", features: ["280 edited photos", "Reception coverage", "Couple shoot", "Same day preview"], popular: true },
      { id: "12c", name: "Gold", price: 45000, duration: "Full celebration", features: ["400+ photos", "Multi-event coverage", "Video highlights", "Custom album"] }
    ]
  },
  {
    id: "13",
    name: "Rahul Gupta",
    email: "rahul.gupta@bookmysnap.com",
    shootTypes: ["Fashion", "Product"],
    experience: "9+ years",
    rating: 4.9,
    reviewCount: 245,
    description: "High-end fashion and luxury product photographer with international experience and cutting-edge techniques.",
    camera: "Phase One XF IQ4",
    sessionsCompleted: 678,
    hourlyRate: 4000,
    portfolios: ["photo-1469334031218-e382a71b716b", "photo-1441986300917-64674bd600d8", "photo-1524504388940-b1c1722653e1"],
    packages: [
      { id: "13a", name: "Basic", price: 20000, duration: "4 hours", features: ["100 edited photos", "Studio lighting", "Basic retouching"] },
      { id: "13b", name: "Premium", price: 35000, duration: "8 hours", features: ["200 edited photos", "Multiple setups", "Advanced editing", "Creative direction"], popular: true },
      { id: "13c", name: "Gold", price: 60000, duration: "Full day", features: ["350+ photos", "Concept development", "Team management", "Campaign ready"] }
    ]
  },
  {
    id: "14",
    name: "Kavya Nair",
    email: "kavya.nair@bookmysnap.com",
    shootTypes: ["Portrait", "Wedding"],
    experience: "5+ years",
    rating: 4.7,
    reviewCount: 156,
    description: "Artistic portrait and intimate wedding photographer with a focus on natural light and emotional storytelling.",
    camera: "Canon EOS R5",
    sessionsCompleted: 423,
    hourlyRate: 2700,
    portfolios: ["photo-1531746020798-e6953c6e8e04", "photo-1507003211169-0a1dd7228f2d", "photo-1438761681033-6461ffad8d80"],
    packages: [
      { id: "14a", name: "Basic", price: 12000, duration: "3 hours", features: ["120 edited photos", "Natural lighting", "Candid moments"] },
      { id: "14b", name: "Premium", price: 22000, duration: "6 hours", features: ["220 edited photos", "Golden hour session", "Multiple locations", "Art prints"], popular: true },
      { id: "14c", name: "Gold", price: 38000, duration: "Full day", features: ["350+ photos", "Pre-wedding shoot", "Custom album", "Fine art editing"] }
    ]
  },
  {
    id: "15",
    name: "Sanjay Bhatt",
    email: "sanjay.bhatt@bookmysnap.com",
    shootTypes: ["Real Estate", "Architecture"],
    experience: "12+ years",
    rating: 4.8,
    reviewCount: 287,
    description: "Veteran architectural photographer specializing in luxury real estate and commercial buildings with drone expertise.",
    camera: "Canon EOS R6 Mark II",
    sessionsCompleted: 745,
    hourlyRate: 3100,
    portfolios: ["photo-1527576539890-dfa815648363", "photo-1488972685288-c3fd157d7c7a", "photo-1518005020951-eccb494ad742"],
    packages: [
      { id: "15a", name: "Basic", price: 10000, duration: "4 hours", features: ["60 edited photos", "Interior shots", "HDR processing"] },
      { id: "15b", name: "Premium", price: 18000, duration: "6 hours", features: ["120 edited photos", "Exterior/Interior", "Drone photography", "Twilight shots"], popular: true },
      { id: "15c", name: "Gold", price: 32000, duration: "Full day", features: ["200+ photos", "360° virtual tour", "Video walkthrough", "Marketing package"] }
    ]
  },
  {
    id: "16",
    name: "Pooja Iyer",
    email: "pooja.iyer@bookmysnap.com",
    shootTypes: ["Event", "Corporate"],
    experience: "7+ years",
    rating: 4.6,
    reviewCount: 198,
    description: "Professional event and corporate photographer with expertise in conferences, seminars, and business events.",
    camera: "Nikon Z9",
    sessionsCompleted: 567,
    hourlyRate: 2300,
    portfolios: ["photo-1519741497674-611481863552", "photo-1519389950473-47ba0277781c", "photo-1496307653780-42ee777d4833"],
    packages: [
      { id: "16a", name: "Basic", price: 8000, duration: "4 hours", features: ["150 edited photos", "Event coverage", "Basic editing"] },
      { id: "16b", name: "Premium", price: 15000, duration: "8 hours", features: ["250 edited photos", "Multiple angles", "Same day delivery", "Social media ready"], popular: true },
      { id: "16c", name: "Gold", price: 25000, duration: "Full event", features: ["400+ photos", "Video highlights", "Live streaming support", "Brand integration"] }
    ]
  },
  {
    id: "17",
    name: "Arpit Saxena",
    email: "arpit.saxena@bookmysnap.com",
    shootTypes: ["Fashion", "Editorial"],
    experience: "8+ years",
    rating: 4.9,
    reviewCount: 223,
    description: "Creative fashion and editorial photographer with a bold artistic vision and magazine-quality work.",
    camera: "Sony α7R V",
    sessionsCompleted: 634,
    hourlyRate: 3600,
    portfolios: ["photo-1524504388940-b1c1722653e1", "photo-1469334031218-e382a71b716b", "photo-1438761681033-6461ffad8d80"],
    packages: [
      { id: "17a", name: "Basic", price: 16000, duration: "4 hours", features: ["100 edited photos", "Studio session", "Creative direction"] },
      { id: "17b", name: "Premium", price: 30000, duration: "8 hours", features: ["200 edited photos", "Multiple concepts", "Professional styling", "Retouching"], popular: true },
      { id: "17c", name: "Gold", price: 50000, duration: "Full day", features: ["300+ photos", "Editorial quality", "Team coordination", "Portfolio creation"] }
    ]
  },
  {
    id: "18",
    name: "Nisha Rao",
    email: "nisha.rao@bookmysnap.com",
    shootTypes: ["Wedding", "Portrait"],
    experience: "6+ years",
    rating: 4.7,
    reviewCount: 174,
    description: "Contemporary wedding and portrait photographer with a fresh perspective on traditional celebrations.",
    camera: "Canon EOS R6",
    sessionsCompleted: 456,
    hourlyRate: 2800,
    portfolios: ["photo-1606216794074-735e91aa2c92", "photo-1531746020798-e6953c6e8e04"],
    packages: [
      { id: "18a", name: "Basic", price: 14000, duration: "5 hours", features: ["180 edited photos", "Ceremony coverage", "Family shots"] },
      { id: "18b", name: "Premium", price: 26000, duration: "8 hours", features: ["320 edited photos", "Full day coverage", "Couple portraits", "Same day edit"], popular: true },
      { id: "18c", name: "Gold", price: 42000, duration: "Multi-day", features: ["500+ photos", "Pre/post wedding", "Album design", "Video highlights"] }
    ]
  },
  {
    id: "19",
    name: "Manish Khanna",
    email: "manish.khanna@bookmysnap.com",
    shootTypes: ["Product", "Commercial"],
    experience: "10+ years",
    rating: 4.8,
    reviewCount: 267,
    description: "Commercial product photographer with extensive experience in e-commerce and advertising photography.",
    camera: "Fujifilm GFX 100S",
    sessionsCompleted: 723,
    hourlyRate: 3300,
    portfolios: ["photo-1441986300917-64674bd600d8", "photo-1560472354-b33ff0c44a43", "photo-1469334031218-e382a71b716b"],
    packages: [
      { id: "19a", name: "Basic", price: 12000, duration: "4 hours", features: ["80 product shots", "White background", "Basic editing"] },
      { id: "19b", name: "Premium", price: 22000, duration: "8 hours", features: ["150 product shots", "Multiple backgrounds", "Advanced editing", "Lifestyle integration"], popular: true },
      { id: "19c", name: "Gold", price: 38000, duration: "Full day", features: ["250+ shots", "Creative concepts", "Model integration", "Campaign development"] }
    ]
  },
  {
    id: "20",
    name: "Shreya Mishra",
    email: "shreya.mishra@bookmysnap.com",
    shootTypes: ["Portrait", "Family"],
    experience: "4+ years",
    rating: 4.6,
    reviewCount: 128,
    description: "Warm and approachable photographer specializing in family portraits and lifestyle photography with natural settings.",
    camera: "Sony α7 IV",
    sessionsCompleted: 298,
    hourlyRate: 2100,
    portfolios: ["photo-1507003211169-0a1dd7228f2d", "photo-1544005313-94ddf0286df2", "photo-1531746020798-e6953c6e8e04"],
    packages: [
      { id: "20a", name: "Basic", price: 8000, duration: "2 hours", features: ["60 edited photos", "Outdoor session", "Natural lighting"] },
      { id: "20b", name: "Premium", price: 15000, duration: "4 hours", features: ["120 edited photos", "Multiple locations", "Family coordination", "Print package"], popular: true },
      { id: "20c", name: "Gold", price: 26000, duration: "Full day", features: ["200+ photos", "Extended family", "Multiple outfits", "Custom album"] }
    ]
  }
];
