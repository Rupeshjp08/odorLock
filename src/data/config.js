// ============================================================
// ODORLOCK — CENTRAL CONFIGURATION DATA LAYER
// All content, policies, and configurable values live here.
// Connect a backend or CMS to replace these values.
// ============================================================

export const BRAND = {
  name: 'OdorLock',
  tagline: 'Clean Helmets. Safer Rides.',
  logo: '/logo.png',
  logoWhite: '/logo-white.png',
  logoMark: '/logo-mark.png',
  email: 'support@odorlock.in',
  phone: '+91 98765 43210',
  address: 'OdorLock Technologies Pvt. Ltd., Bengaluru, Karnataka, India — 560001',
  social: {
    instagram: 'https://instagram.com/odorlock',
    youtube: 'https://youtube.com/@odorlock',
    facebook: 'https://facebook.com/odorlock',
    linkedin: 'https://linkedin.com/company/odorlock',
    twitter: 'https://twitter.com/odorlock',
  },
};

// ============================================================
// PRODUCT — No price exposed here. Add to backend config.
// ============================================================
export const PRODUCT = {
  id: 'odorlock-v1',
  name: 'OdorLock Smart Helmet Care Device',
  shortName: 'OdorLock',
  sku: 'OL-V1-2024',
  image: '/product-white.jpg',
  gallery: ['/product-white.jpg', '/product-black.jpg'],
  // Color variants — add more as needed
  variants: [
    {
      id: 'white',
      label: 'Arctic White',
      color: '#F8FAFC',
      border: '#CBD5E1',
      image: '/product-white.jpg',
      gallery: ['/product-white.jpg'],
      available: true,
    },
    {
      id: 'black',
      label: 'Midnight Black',
      color: '#1E293B',
      border: '#0F172A',
      image: '/product-black.jpg',
      gallery: ['/product-black.jpg'],
      available: true,
    },
  ],
  description:
    'OdorLock is an automated helmet-care device designed to help riders reduce moisture, unpleasant odor, and improve post-ride helmet care.',
  whatsIncluded: [
    'OdorLock Device (1 unit)',
    'Power Adapter (compatible with Indian sockets)',
    'User Manual',
    'Warranty Card',
  ],
  warranty: '1 Year Limited Warranty',
  delivery: 'Free delivery across India',
  // PRICE IS NOT EXPOSED — configure via backend/payment gateway
  priceConfig: {
    note: 'Price configured via payment gateway. Do not expose in UI.',
  },
};

// ============================================================
// TRUST BADGES (configurable)
// ============================================================
export const TRUST_BADGES = [
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Free Delivery',
    subtitle: 'Across India',
  },
  {
    id: 'warranty',
    icon: 'shield',
    title: '1 Year Warranty',
    subtitle: 'Peace of mind',
  },
  {
    id: 'payments',
    icon: 'lock',
    title: 'Secure Payments',
    subtitle: 'UPI / Cards / COD',
  },
];

// ============================================================
// FEATURES
// ============================================================
export const FEATURES = [
  {
    id: 'moisture-detection',
    icon: 'droplets',
    title: 'Moisture Detection',
    category: 'Smart Sensing',
    metric: '±1.5% RH',
    image: '/images/features/feature_moisture.jpg',
    shortDesc: 'Helps reduce trapped sweat and humidity, keeping your helmet fresher and drier.',
    description:
      'Built-in capacitive relative humidity sensors detect moisture levels inside helmet foam lining. The device activates directed airflow when needed, helping reduce trapped sweat and humidity for a fresher helmet after every ride.',
    benefits: ['Helps reduce trapped moisture', 'Fresher helmet interior', 'Smarter care cycle'],
    spec: '±1.5% RH capacitive sensor • Real-time drying feedback • Auto-shutoff trigger',
  },
  {
    id: 'directed-airflow',
    icon: 'wind',
    title: 'Directed Airflow',
    category: 'Aero Dynamics',
    metric: '42 CFM Vortex',
    image: '/images/features/feature_airflow.jpg',
    shortDesc: 'Focused airflow reaches inside the helmet to support effective drying.',
    description:
      'Focused, gentle airflow is directed into the helmet interior through a precision twin-scroll curved nozzle to support effective drying. The airflow is optimized to reach inner padding, brow vents, and cheek liners.',
    benefits: ['Targeted interior drying', 'Gentle on helmet materials', 'Quiet operation'],
    spec: '42 CFM high-pressure centrifugal blower • Twin-scroll directional duct',
  },
  {
    id: 'odor-control',
    icon: 'sparkles',
    title: 'Odor Control',
    category: 'Filtration',
    metric: '99.8% Removal',
    image: '/images/features/feature_odor.jpg',
    shortDesc: 'Helps reduce unpleasant smells with an odor-control treatment.',
    description:
      'The odor-control stage combines medical-grade activated coconut carbon honeycomb with botanical enzyme vapor beads to neutralize unpleasant sweat bacteria and odors at the molecular level.',
    benefits: ['Helps reduce unpleasant odor', 'Post-ride freshening', 'Automatic treatment'],
    spec: 'Removable cartridge • Medical-grade activated carbon + botanical neutralizer',
  },
  {
    id: 'automatic-shutoff',
    icon: 'timer',
    title: 'Automatic Shutoff',
    category: 'Automation',
    metric: 'Smart Sensor-Off',
    image: '/images/features/feature_shutoff.jpg',
    shortDesc: 'Stops automatically when the care cycle is complete.',
    description:
      'OdorLock stops automatically when padding humidity drops below the safety threshold — safe, smart and energy efficient. No need to monitor the device or remember to switch it off.',
    benefits: ['Energy efficient', 'Safe automatic operation', 'No supervision needed'],
    spec: '32-bit ARM MCU • Dynamic humidity threshold cutoff • Thermal protection @ 45°C',
  },
  {
    id: 'compact-design',
    icon: 'package',
    title: 'Compact Design',
    category: 'Form Factor',
    metric: '310 × 245 mm',
    image: '/images/features/feature_compact.jpg',
    shortDesc: 'Designed to fit in your home, garage, or riding space without taking up much room.',
    description:
      'OdorLock is designed with a minimal footprint. Place it on your workbench, shelf, or bedside table without dominating your space, featuring a modern satin polymer finish.',
    benefits: ['Minimal footprint', 'Works in any space', 'Clean aesthetic'],
    spec: '310mm (H) × 245mm (W) × 275mm (D) • Low center-of-gravity alloy base insert',
  },
  {
    id: 'quiet-operation',
    icon: 'volume-x',
    title: 'Quiet Operation',
    category: 'Acoustics',
    metric: '<28 dB(A)',
    image: '/images/features/feature_quiet.jpg',
    shortDesc: 'Runs quietly so you can leave it running without disturbance.',
    description:
      'Engineered with dual-ball-bearing centrifugal impellers and acoustic baffling. Run OdorLock in your bedroom, living room or garage overnight with whisper-quiet operation.',
    benefits: ['Low noise output', 'Use anywhere', 'Night-time safe'],
    spec: '<28 dB(A) acoustic envelope • Brushless DC motor with silicone vibration decouplers',
  },
  {
    id: 'low-power',
    icon: 'zap',
    title: 'Low-Power Design',
    category: 'Power Delivery',
    metric: '15W USB-C PD',
    image: '/images/features/feature_power.jpg',
    shortDesc: 'Designed for energy efficiency throughout the care cycle.',
    description:
      'OdorLock runs on universal USB-C Power Delivery (5V/9V), consuming just 15W peak. Power it from wall adapters, power banks, garage workstations, or motorcycle 12V sockets.',
    benefits: ['Daily use friendly', 'Energy conscious', 'Responsible design'],
    spec: 'Universal USB-C PD 3.0 • 15W peak consumption • Surge & reverse polarity protection',
  },
  {
    id: 'helmet-support',
    icon: 'hard-hat',
    title: 'Helmet Support',
    category: 'Ergonomics',
    metric: 'XS to XXL',
    image: '/images/features/feature_support.jpg',
    shortDesc: 'Designed to support most standard motorcycle and scooter helmets.',
    description:
      'Compatible with full-face, modular, open-face, dual-sport, and half-face motorcycle helmets. Non-marking silicone support pads protect delicate helmet liners from deformation.',
    benefits: ['Wide helmet compatibility', 'Supports daily riders', 'Multiple helmet types'],
    spec: 'Ergonomic silicone dock • Multi-point weight distribution • Fits up to XXL helmets',
  },
  {
    id: 'auto-cycle',
    icon: 'refresh-cw',
    title: 'Automatic Care Cycle',
    category: 'One-Touch Control',
    metric: 'One-Touch Care',
    image: '/images/features/feature_cycle.jpg',
    shortDesc: 'Runs a complete care cycle automatically, from start to finish.',
    description:
      'Place your helmet, press the illuminated capacitive start button, and OdorLock handles the rest. Moisture sensing, vortex drying, odor neutralization, and auto-shutoff — all in one sequence.',
    benefits: ['One-touch operation', 'Complete automated care', 'No manual steps'],
    spec: 'Capacitive touch switch • Glowing green halo indicator • Automated 4-stage cycle',
  },
];

// ============================================================
// WORKFLOW STEPS
// ============================================================
export const WORKFLOW_STEPS = [
  {
    id: 1,
    number: '01',
    title: 'Place Your Helmet',
    description: 'Set your helmet on the OdorLock device.',
    detail: 'Simply place your motorcycle or scooter helmet onto the OdorLock device. The device is designed to support most standard helmet sizes.',
    icon: 'helmet',
    stage: 'HELMET PLACEMENT',
  },
  {
    id: 2,
    number: '02',
    title: 'Automatic Care Cycle',
    description: 'Moisture detection, directed drying, odor control and freshening.',
    detail: 'Press the start button and OdorLock begins its automatic care cycle. The device detects moisture levels and activates directed airflow accordingly.',
    icon: 'cycle',
    stage: 'CARE CYCLE',
  },
  {
    id: 3,
    number: '03',
    title: 'Smart Shutoff',
    description: 'Device stops automatically when the cycle is complete.',
    detail: 'Once the care cycle is complete, OdorLock stops automatically. No need to monitor or manually switch off the device.',
    icon: 'timer',
    stage: 'SMART SHUTOFF',
  },
  {
    id: 4,
    number: '04',
    title: 'Ride Fresh',
    description: 'Pick up your helmet and enjoy a fresher ride.',
    detail: 'Your helmet is ready. OdorLock has completed its care cycle — pick up your helmet and ride with comfort and confidence.',
    icon: 'ride',
    stage: 'READY',
  },
];

// ============================================================
// DETAILED CYCLE STAGES (for simulation)
// ============================================================
export const CYCLE_STAGES = [
  { id: 'ready', label: 'Ready', duration: 2 },
  { id: 'checking', label: 'Checking Helmet', duration: 3 },
  { id: 'detecting', label: 'Detecting Moisture', duration: 4 },
  { id: 'drying', label: 'Drying', duration: 6 },
  { id: 'odor', label: 'Odor Control', duration: 5 },
  { id: 'hygiene', label: 'Hygiene Support', duration: 4 },
  { id: 'complete', label: 'Completed', duration: 2 },
];

// ============================================================
// COMPARISON TABLE
// ============================================================
export const COMPARISON_ROWS = [
  {
    feature: 'Drying process',
    odorlock: 'Automatic directed airflow',
    traditional: 'Manual — air dry (hours/days)',
  },
  {
    feature: 'Odor control',
    odorlock: 'Designed for repeated odor support',
    traditional: 'Requires manual sprays or airing',
  },
  {
    feature: 'Convenience',
    odorlock: 'Automatic — one touch',
    traditional: 'Manual effort required',
  },
  {
    feature: 'Hygiene support',
    odorlock: 'Built-in hygiene support stage',
    traditional: 'Depends on manual cleaning',
  },
  {
    feature: 'Automation',
    odorlock: 'Fully automatic with smart shutoff',
    traditional: 'No automation',
  },
  {
    feature: 'Consistency',
    odorlock: 'Same care cycle every time',
    traditional: 'Results vary with manual method',
  },
];

// ============================================================
// FAQS
// ============================================================
export const FAQS = [
  {
    id: 'faq-1',
    question: 'How long does the care cycle take?',
    answer: 'The duration of the OdorLock care cycle depends on the moisture level detected. The device is designed to complete the cycle efficiently. Specific timing details will be confirmed in final product specifications.',
  },
  {
    id: 'faq-2',
    question: 'Is OdorLock compatible with different helmet types?',
    answer: 'OdorLock is designed to support most standard full-face, open-face, and half-face motorcycle and scooter helmets. We recommend checking your helmet dimensions against the device specifications before purchase.',
  },
  {
    id: 'faq-3',
    question: 'Does it remove unpleasant odor?',
    answer: 'OdorLock is designed to help reduce unpleasant odors caused by sweat and moisture. The odor-control stage works to freshen the helmet interior. Results may vary depending on helmet condition and usage.',
  },
  {
    id: 'faq-4',
    question: 'Does it completely sterilize the helmet?',
    answer: 'OdorLock is not designed or marketed as a sterilization device. It is designed to support helmet hygiene and help reduce moisture and unpleasant odor. For medical or clinical sterilization, appropriate medical equipment should be used.',
  },
  {
    id: 'faq-5',
    question: 'Can I use it every day?',
    answer: 'OdorLock is designed for regular, daily use. The automatic shutoff and low-power design make it suitable for use after every ride.',
  },
  {
    id: 'faq-6',
    question: 'What power supply does it need?',
    answer: 'OdorLock includes a power adapter compatible with standard Indian electrical sockets (230V, 50Hz). Full power specifications will be available in the product documentation.',
  },
  {
    id: 'faq-7',
    question: 'How does the moisture detection work?',
    answer: 'OdorLock uses built-in sensors to detect moisture levels inside the helmet. The device uses this information to manage the care cycle appropriately. Full technical specifications will be available closer to launch.',
  },
  {
    id: 'faq-8',
    question: 'What is the warranty?',
    answer: 'OdorLock comes with a 1-year limited warranty covering manufacturing defects. Please refer to the warranty card included with your device for full terms and conditions.',
  },
  {
    id: 'faq-9',
    question: 'Can I use it at home?',
    answer: 'Yes. OdorLock is designed for home use. Its compact design, quiet operation, and low-power profile make it practical for use in bedrooms, garages, or any living space.',
  },
  {
    id: 'faq-10',
    question: 'Can businesses use OdorLock?',
    answer: 'OdorLock may be suitable for businesses such as motorcycle rental companies, riding schools, and automotive businesses that manage multiple helmets. Contact us at support@odorlock.in to discuss business or bulk requirements.',
  },
];

// ============================================================
// DEMO TESTIMONIALS (clearly configurable — replace with real data)
// ============================================================
export const DEMO_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rohit Sharma',
    location: 'Bengaluru',
    rating: 5,
    review: 'The helmet feels fresh and dry after every ride. Super convenient to use at the petrol bunk while I\'m already there for fuel.',
    verified: false,
    date: '3 weeks ago',
    avatar: 'RS',
    isDemo: true,
  },
  {
    id: 't2',
    name: 'Priya Nair',
    location: 'Kochi',
    rating: 5,
    review: 'I used to get headaches from my helmet, especially during summers. OdorLock has really made a difference. Highly recommended!',
    verified: false,
    date: '3 weeks ago',
    avatar: 'PN',
    isDemo: true,
  },
  {
    id: 't3',
    name: 'Aman Verma',
    location: 'Jaipur',
    rating: 5,
    review: 'Easy to use, quick cycle and the helmet feels so much better. Great product for daily riders.',
    verified: false,
    date: '1 month ago',
    avatar: 'AV',
    isDemo: true,
  },
];

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Features', href: '/features' },
  { label: 'Purchase', href: '/product' },
  { label: 'Contact', href: '/contact' },
];

// ============================================================
// FOOTER LINKS
// ============================================================
export const FOOTER_LINKS = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Features', href: '/features' },
    { label: 'Purchase', href: '/product' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Reviews', href: '/reviews' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
};

// ============================================================
// SEARCHABLE CONTENT
// ============================================================
export const SEARCHABLE_CONTENT = [
  { title: 'Home', path: '/', keywords: ['home', 'odorlock', 'helmet', 'fresher ride'] },
  { title: 'How It Works', path: '/how-it-works', keywords: ['how', 'works', 'steps', 'cycle', 'process'] },
  { title: 'Features', path: '/features', keywords: ['features', 'moisture', 'airflow', 'odor', 'shutoff', 'specifications'] },
  { title: 'Product', path: '/product', keywords: ['product', 'buy', 'purchase', 'add to cart', 'order'] },
  { title: 'FAQ', path: '/faq', keywords: ['faq', 'questions', 'answers', 'help', 'support'] },
  { title: 'Reviews', path: '/reviews', keywords: ['reviews', 'testimonials', 'customers', 'feedback'] },
  { title: 'Contact', path: '/contact', keywords: ['contact', 'support', 'email', 'phone', 'help'] },
  { title: 'About', path: '/about', keywords: ['about', 'company', 'brand', 'story'] },
  { title: 'Track Order', path: '/track-order', keywords: ['track', 'order', 'delivery', 'status', 'shipping'] },
];
