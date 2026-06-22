/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, DeliveryRider } from './types';

export const CATEGORIES = [
  { id: 'all', name: '✏️ All Items' },
  { id: 'fresh-produce', name: '🥦 Fresh Produce' },
  { id: 'staples-flours', name: '🌾 Staples & Flours' },
  { id: 'dals-pulses', name: '🫘 Dals & Pulses' },
  { id: 'dairy-mediums', name: '🛢️ Dairy & Oils' },
  { id: 'spices-condiments', name: '🫙 Spices & Seasonings' },
  { id: 'breakfast-beverages', name: '☕ Breakfast & Drinks' },
  { id: 'snacks-packaged', name: '🍪 Snacks & Foods' },
  { id: 'baking-global', name: '🧁 Baking & Global' },
  { id: 'household-personal', name: '🧼 Household & Care' },
  { id: 'baby-care', name: '👶 Infant & Baby' }
];

export const PRODUCTS: Product[] = [
  // --- FRESH PRODUCE ---
  {
    id: 'fp1',
    name: 'Fresh Red Onions (Pyaaz)',
    category: 'fresh-produce',
    price: 35,
    originalPrice: 45,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400',
    description: 'Farm-fresh, crisp red onions. Features flaky skins and a sharp, traditional pungency. Excellent base for gravy, tadka, and daily salads.',
    shelfLife: '7 days',
    benefits: ['Excellent prebiotic properties', 'High in heart-healthy antioxidants', 'Supports blood sugar management'],
    nutrients: [
      { label: 'Calories', value: '40 kcal' },
      { label: 'Carbohydrates', value: '9.3 g' },
      { label: 'Dietary Fiber', value: '1.7 g' }
    ],
    rating: 4.8,
    reviewsCount: 1650
  },
  {
    id: 'fp2',
    name: 'Premium Jyoti Potatoes (Aloo)',
    category: 'fresh-produce',
    price: 32,
    originalPrice: 40,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    description: 'Freshly harvested Jyoti potatoes from selected fields. Earthy, thin-skinned and low on moisture, making them absolutely ideal for curries, baking, or frying.',
    shelfLife: '10 days (Keep stored in cool, dark spots)',
    benefits: ['Good source of Vitamin B6 and potassium', 'Naturally gluten-free grain substitute', 'Provides sustained daily energy'],
    nutrients: [
      { label: 'Calories', value: '77 kcal' },
      { label: 'Carbs', value: '17 g' },
      { label: 'Potassium', value: '421 mg' }
    ],
    rating: 4.7,
    reviewsCount: 1940
  },
  {
    id: 'fp3',
    name: 'Hybrid Crimson Tomatoes (Tamatar)',
    category: 'fresh-produce',
    price: 48,
    originalPrice: 60,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400',
    description: 'Glossy red, juicy hybrid tomatoes. Uniformly ripe with a balanced sweet and tangy flavor depth. Packed with juice and vitamins.',
    shelfLife: '4 days',
    benefits: ['Excellent source of Lycopene', 'Supports cardiovascular health', 'Rich in active Vitamin C'],
    nutrients: [
      { label: 'Calories', value: '18 kcal' },
      { label: 'Vitamin C', value: '13.7 mg' },
      { label: 'Water Content', value: '94%' }
    ],
    rating: 4.6,
    reviewsCount: 1120
  },
  {
    id: 'fp4',
    name: 'Fresh Green Leafy Spinach (Palak)',
    category: 'fresh-produce',
    price: 24,
    originalPrice: 32,
    weight: '250 g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    description: 'Tender spinach leaves harvested fresh in the morning. Triple-washed, free of heavy roots, and rich in natural minerals.',
    shelfLife: '2 days',
    benefits: ['Exceptionally high in dietary Iron and Folate', 'Boosts bone density via Vitamin K', 'Loaded with dietary fibers'],
    nutrients: [
      { label: 'Iron', value: '2.7 mg' },
      { label: 'Calcium', value: '99 mg' },
      { label: 'Vitamin K', value: '483 mcg' }
    ],
    rating: 4.9,
    reviewsCount: 840
  },
  {
    id: 'fp5',
    name: 'Fresh Coriander Leaves (Dhaniya)',
    category: 'fresh-produce',
    price: 15,
    originalPrice: 20,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?auto=format&fit=crop&q=80&w=400',
    description: 'Crisp aromatic coriander leaves with juicy tender stems. Brings a lively citrusy punch to garnishes, garnishing curries, or blended chutneys.',
    shelfLife: '3 days',
    benefits: ['Excellent digestion catalyst', 'Promotes dynamic cellular detox', 'Cooling profile properties'],
    nutrients: [
      { label: 'Vitamin C', value: '27 mg' },
      { label: 'Vitamin A', value: '337 mcg' }
    ],
    rating: 4.8,
    reviewsCount: 2200
  },
  {
    id: 'fp6',
    name: 'Spicy Green Chilies (Hari Mirch)',
    category: 'fresh-produce',
    price: 18,
    originalPrice: 25,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=400',
    description: 'Fiery, slender green chilies offering high heat index. Perfect for adding a pungent kick to traditional Indian dals and curries.',
    shelfLife: '6 days',
    benefits: ['High in Capsaicin', 'Accelerates fat oxidation and metabolism', 'Rich in antioxidant Vitamin C'],
    nutrients: [
      { label: 'Capsaicin', value: 'High' },
      { label: 'Vitamin C', value: '143 mg' }
    ],
    rating: 4.7,
    reviewsCount: 1530
  },
  {
    id: 'fp7',
    name: 'Earthy Ginger & Garlic Combo',
    category: 'fresh-produce',
    price: 38,
    originalPrice: 48,
    weight: '200 g Combo',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400',
    description: 'A handpicked mix of ginger and plump garlic bulbs. Ideal ratio for fresh home-made ginger-garlic paste with intense flavor properties.',
    shelfLife: '10 days',
    benefits: ['Highly potent anti-inflammatory properties', 'Great immune defense booster', 'Improves circulatory flow and respiratory wellness'],
    nutrients: [
      { label: 'Allicin (Garlic)', value: 'Active' },
      { label: 'Gingerols (Ginger)', value: 'Active' }
    ],
    rating: 4.8,
    reviewsCount: 1420
  },
  {
    id: 'fp8',
    name: 'Juicy Seedless Lemons (Nimbu)',
    category: 'fresh-produce',
    price: 25,
    originalPrice: 35,
    weight: '250 g (~5 pcs)',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=400',
    description: 'Thin-skinned yellow lemons with maximum juice retention. Squeezes easily to make tangy dressings, lemonades, or garnish gravies.',
    shelfLife: '7 days',
    benefits: ['Excellent source of citric acid', 'Aids rapid detoxification', 'Very high Vitamin C power'],
    nutrients: [
      { label: 'Citric Acid', value: '1.4 g' },
      { label: 'Vitamin C', value: '53 mg' }
    ],
    rating: 4.7,
    reviewsCount: 1890
  },
  {
    id: 'fp9',
    name: 'Crispy Cauliflower (Phool Gobhi)',
    category: 'fresh-produce',
    price: 42,
    originalPrice: 55,
    weight: '1 pc (~600 g)',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3cd3?auto=format&fit=crop&q=80&w=400',
    description: 'Clean, dense, snow-white cauliflower head framed by fresh green leaves. Ideal for stir-fries, gobi parathas, or roasted dishes.',
    shelfLife: '4 days',
    benefits: ['Rich in Choline for brain health', 'High content of dietary fiber', 'Gluten-free rice alternative'],
    nutrients: [
      { label: 'Calories', value: '25 kcal' },
      { label: 'Fiber', value: '2 g' }
    ],
    rating: 4.5,
    reviewsCount: 960
  },
  {
    id: 'fp10',
    name: 'Tender Ladies Finger (Bhindi)',
    category: 'fresh-produce',
    price: 30,
    originalPrice: 40,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1449300079324-964320ded51d?auto=format&fit=crop&q=80&w=400',
    description: 'Young, snap-tender okra pods with high crunch factor. Low on slime when cooked properly. Ideal for rich bhindi-masala or crispy kurkuri bhindi.',
    shelfLife: '4 days',
    benefits: ['Enriched with healthy mucilage fiber', 'High in heart-protecting folate', 'Supports blood lipid control'],
    nutrients: [
      { label: 'Dietary Fiber', value: '3.2 g' },
      { label: 'Folate', value: '60 mcg' }
    ],
    rating: 4.6,
    reviewsCount: 790
  },
  {
    id: 'fp11',
    name: 'Organic Cavendish Bananas',
    category: 'fresh-produce',
    price: 49,
    originalPrice: 65,
    weight: '500 g (~4 pcs)',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400',
    description: 'Perfectly ripe, golden-yellow robusta bananas. Sweet, dense in potassium and essential dietary fibers, making for an instant energy boost.',
    shelfLife: '3 days',
    benefits: ['Excellent source of quick dietary energy', 'High in potassium for dynamic muscle recovery', 'Supports stomach gut-linings and digestion'],
    nutrients: [
      { label: 'Calories', value: '89 kcal' },
      { label: 'Potassium', value: '358 mg' }
    ],
    rating: 4.8,
    reviewsCount: 3105
  },
  {
    id: 'fp12',
    name: 'Royal Shimla Red Apples',
    category: 'fresh-produce',
    price: 139,
    originalPrice: 180,
    weight: '4 pcs (~600 g)',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400',
    description: 'Crisp, sweet, and direct from the pristine apple orchard hubs of Himachal Pradesh. Beautiful natural skin blush with perfect crunch.',
    shelfLife: '7 days',
    benefits: ['Supports cardiovascular blood wellness', 'Rich in natural active antioxidants', 'High water and fiber combination'],
    nutrients: [
      { label: 'Calories', value: '95 kcal' },
      { label: 'Dietary Fiber', value: '4.4 g' }
    ],
    rating: 4.9,
    reviewsCount: 1640
  },
  {
    id: 'fp13',
    name: 'Alphonso Mangoes (Seasonal)',
    category: 'fresh-produce',
    price: 299,
    originalPrice: 400,
    weight: '2 pcs (~500 g)',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    description: 'Premium Devgad Alphonso mangoes. Scented, intensely sweet orange pulp with a buttery, fiberless texture that melts instantly in the mouth.',
    shelfLife: '3 days',
    benefits: ['Packed with immunity vitamin complexes A & C', 'Supports cellular renewal and skin health', 'Rich in digestive enzyme catalysts'],
    nutrients: [
      { label: 'Calories', value: '150 kcal' },
      { label: 'Vitamin A', value: '76% DV' },
      { label: 'Vitamin C', value: '60% DV' }
    ],
    rating: 4.9,
    reviewsCount: 880
  },

  // --- STAPLES & FLOURS ---
  {
    id: 'st1',
    name: 'Sharbati Whole Wheat Atta',
    category: 'staples-flours',
    price: 215,
    originalPrice: 245,
    weight: '5 kg',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    description: '100% stone-ground MP Sharbati wheat grains. Yields ultra-soft, golden rotis and phulkas that stay fresh and fluffy for hours.',
    shelfLife: '90 days',
    benefits: ['High in natural wheat bran and germ', 'Sustained energy discharge index', 'Rich in mineral magnesium and iron'],
    nutrients: [
      { label: 'Dietary Fiber', value: '11 g' },
      { label: 'Protein', value: '12.8 g' }
    ],
    rating: 4.8,
    reviewsCount: 5410
  },
  {
    id: 'st2',
    name: 'Fine Besan (Gram Flour)',
    category: 'staples-flours',
    price: 85,
    originalPrice: 105,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    description: 'High-quality stone-ground Chana Dal flour. Absolutely pure, smooth-sifted, free of adulterants. Perfect for hot pakoras, laddoos, or daily chillas.',
    shelfLife: '60 days',
    benefits: ['Enriched with healthy plant proteins', 'Gluten-free baking substitute option', 'Low glycemic index supports stable sugars'],
    nutrients: [
      { label: 'Protein', value: '22 g' },
      { label: 'Folate', value: '45% DV' }
    ],
    rating: 4.7,
    reviewsCount: 1680
  },
  {
    id: 'st3',
    name: 'Sprouted Ragi Flour (Millet)',
    category: 'staples-flours',
    price: 95,
    originalPrice: 120,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=400',
    description: 'Nutrient-rich finger millet flour. Sprouted to eliminate anti-nutrients, facilitating highly active mineral bio-availability. Superb for ragi malt, idlis, or porridge.',
    shelfLife: '90 days',
    benefits: ['Extraordinary concentrations of natural Calcium', 'Outstanding food choice for growing infants', 'Gluten-free with deep prebiotic fiber'],
    nutrients: [
      { label: 'Calcium', value: '344 mg' },
      { label: 'Iron', value: '3.9 mg' }
    ],
    rating: 4.9,
    reviewsCount: 1220
  },
  {
    id: 'st4',
    name: 'Rozana Premium Basmati Rice',
    category: 'staples-flours',
    price: 115,
    originalPrice: 145,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    description: 'Superb aged basmati grains. Fluffs beautifully on boiling, with delicate length expansion and traditional sweet aroma. Perfect for pulao, biryani, or daily meals.',
    shelfLife: '365 days',
    benefits: ['Low to mid-range Glycemic Index', 'Naturally cholesterol-free whole grain', 'Zero sodium or chemical additives'],
    nutrients: [
      { label: 'Energy', value: '350 kcal' },
      { label: 'Carbs', value: '78 g' }
    ],
    rating: 4.7,
    reviewsCount: 2210
  },
  {
    id: 'st5',
    name: 'Sona Masoori Raw Rice',
    category: 'staples-flours',
    price: 295,
    originalPrice: 350,
    weight: '5 kg',
    image: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&q=80&w=400',
    description: 'Premium lightweight Sona Masoori raw rice grains. aged naturally, clean-hulled, non-sticky on boiling. Excellent for South Indian daily rice and sambar.',
    shelfLife: '365 days',
    benefits: ['Extremely easy to digest daily', 'Low-fat food companion staple', 'Sourced responsibly from dry river basins'],
    nutrients: [
      { label: 'Carbs', value: '80 g' },
      { label: 'Protein', value: '6 g' }
    ],
    rating: 4.8,
    reviewsCount: 3410
  },
  {
    id: 'st6',
    name: 'Thick Poha (Flattened Rice)',
    category: 'staples-flours',
    price: 42,
    originalPrice: 55,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    description: 'High quality double-polished thick poha. Absorbs liquids moderately without turning pasty, ideal for traditional Indori/Kanda Poha breakfast bowls.',
    shelfLife: '120 days',
    benefits: ['Excellent source of dietary iron', 'Highly digestible low-calorie breakfast', 'Rich in gut-friendly prebiotics'],
    nutrients: [
      { label: 'Iron', value: '20 mg' },
      { label: 'Calories', value: '180 kcal' }
    ],
    rating: 4.6,
    reviewsCount: 1450
  },
  {
    id: 'st7',
    name: 'Premium Sabudana (Tapioca)',
    category: 'staples-flours',
    price: 68,
    originalPrice: 85,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1548858852-dfb66d54cc8d?auto=format&fit=crop&q=80&w=400',
    description: 'Pure, pearly white Sago/Tapioca pearls of uniform sizing. Swells wonderfully on soaking. Perfect for clean fasting meals, khichdis, or kheer.',
    shelfLife: '180 days',
    benefits: ['Gluten-free starch base energy', 'Aids wholesome digestion and bloating control', 'Ideal during religious dietary fasts'],
    nutrients: [
      { label: 'Dietary Energy', value: '351 kcal' },
      { label: 'Sodium', value: '11 mg' }
    ],
    rating: 4.7,
    reviewsCount: 890
  },

  // --- DALS & PULSES ---
  {
    id: 'dl1',
    name: 'Organic Unpolished Toor Dal',
    category: 'dals-pulses',
    price: 175,
    originalPrice: 210,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1547058881-aa0ebd92a11b?auto=format&fit=crop&q=80&w=400',
    description: 'Premium unpolished Arhar/Toor Dal. Lacks oil-polishing entirely, retaining high natural protein value, flavor intensity, and fast boiling property.',
    shelfLife: '180 days',
    benefits: ['Very high in dietary fibers and protein', 'Excellent source of essential amino acids', 'Rich mineral profile with magnesium'],
    nutrients: [
      { label: 'Protein', value: '22 g' },
      { label: 'Dietary Fiber', value: '15 g' }
    ],
    rating: 4.8,
    reviewsCount: 4120
  },
  {
    id: 'dl2',
    name: 'Moong Dal Dhuli (Yellow)',
    category: 'dals-pulses',
    price: 145,
    originalPrice: 170,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1547058881-aa0ebd92a11b?auto=format&fit=crop&q=80&w=400',
    description: 'Split and washed yellow moong lentil. Highly nutritious, quick cook, and extremely gentle on the stomach. Core ingredient for light comforting khichdi or mung dal soup.',
    shelfLife: '180 days',
    benefits: ['Easiest lentil dal to digest', 'Highly active plant-protein concentration', 'Ideal for recovery and light healing meals'],
    nutrients: [
      { label: 'Protein', value: '24 g' },
      { label: 'Calcium', value: '132 mg' }
    ],
    rating: 4.9,
    reviewsCount: 1980
  },
  {
    id: 'dl3',
    name: 'Bold Unpolished Chana Dal',
    category: 'dals-pulses',
    price: 95,
    originalPrice: 115,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1547058881-aa0ebd92a11b?auto=format&fit=crop&q=80&w=400',
    description: 'Hand-sorted, premium unpolished yellow chickpea split dal. Boils to deep buttery textures. Excellent for dal palak, puran poli, or roasted snack bases.',
    shelfLife: '180 days',
    benefits: ['Exceptionally high in vegan protein', 'Low glycemic index supports heart health', 'Rich source of zinc and folate minerals'],
    nutrients: [
      { label: 'Protein', value: '20.8 g' },
      { label: 'Dietary Fiber', value: '11.5 g' }
    ],
    rating: 4.7,
    reviewsCount: 1390
  },
  {
    id: 'dl4',
    name: 'Premium Rajma Chitra',
    category: 'dals-pulses',
    price: 155,
    originalPrice: 190,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1585994270183-eceabcc15091?auto=format&fit=crop&q=80&w=400',
    description: 'Grown in high mineral environments, these spotted kidney beans cook to smooth melt-in-the-mouth texture. Essential for comfort Rajma-Chawal dinners.',
    shelfLife: '180 days',
    benefits: ['Excellent source of soluble prebiotics', 'Loaded with iron and potassium minerals', 'Supports muscle mass via high protein'],
    nutrients: [
      { label: 'Protein', value: '23 g' },
      { label: 'Iron', value: '5.1 mg' }
    ],
    rating: 4.8,
    reviewsCount: 2110
  },
  {
    id: 'dl5',
    name: 'Amritsari Kabuli Chana (Chhole)',
    category: 'dals-pulses',
    price: 140,
    originalPrice: 175,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1547058881-aa0ebd92a11b?auto=format&fit=crop&q=80&w=400',
    description: 'Double-sorted, bold size white chickpeas with uniform soaking profiles. Ideal for traditional creamy Punjabi Chhole or healthy smooth hummus plates.',
    shelfLife: '180 days',
    benefits: ['Rich in plant-based fibers', 'Helps maintain steady blood sugar curves', 'Enriched with cellular antioxidant nutrients'],
    nutrients: [
      { label: 'Protein', value: '19 g' },
      { label: 'Fiber', value: '12 g' }
    ],
    rating: 4.8,
    reviewsCount: 3102
  },

  // --- DAIRY & OILS ---
  {
    id: 'do1',
    name: 'Kachi Ghani Mustard Oil',
    category: 'dairy-mediums',
    price: 168,
    originalPrice: 195,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    description: 'Cold-pressed from premium black mustard seeds. Richly golden and pungent, it retains maximum natural vitamins and allyl isothiocyanate oils.',
    shelfLife: '240 days',
    benefits: ['Strong antimicrobial properties', 'Monounsaturated fatty acids support cholesterol harmony', 'Enhances food digestability'],
    nutrients: [
      { label: 'MUFA', value: '60 g' },
      { label: 'Vitamin E', value: '15 mg' }
    ],
    rating: 4.8,
    reviewsCount: 5210
  },
  {
    id: 'do2',
    name: 'Pure Vedic Danedar Ghee',
    category: 'dairy-mediums',
    price: 360,
    originalPrice: 420,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1589733901241-5e53429e1db4?auto=format&fit=crop&q=80&w=400',
    description: 'Aromatically rich, granular-textured pure cow ghee. Clarified slowly on light heat, rendering excellent richness. Perfect for rotis, dals and sweets.',
    shelfLife: '180 days',
    benefits: ['High in Short-Chain Fatty Acids (Butyrate)', 'Excellent source of fat-soluble vitamins A, E, D', 'High smoke point makes it safe for deep cooking'],
    nutrients: [
      { label: 'Fat content', value: '99.8%' },
      { label: 'Energy', value: '900 kcal / 100g' }
    ],
    rating: 4.9,
    reviewsCount: 4620
  },
  {
    id: 'do3',
    name: 'Fresh Full Cream Milk',
    category: 'dairy-mediums',
    price: 33,
    originalPrice: 35,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400',
    description: 'Rich pasteurized full cream milk with 6% fat composition. Excellent for yielding thick malai, boiling for tea/coffee or making home-style chenna.',
    shelfLife: '2 days',
    benefits: ['Excellent source of dietary calcium', 'Supports skeletal density and dental wellness', 'High energy healthy fat composition'],
    nutrients: [
      { label: 'Protein', value: '3.2 g' },
      { label: 'Calcium', value: '120 mg' },
      { label: 'Fat', value: '6 g' }
    ],
    rating: 4.9,
    reviewsCount: 12450
  },
  {
    id: 'do4',
    name: 'Fresh Thick Curd (Dahi)',
    category: 'dairy-mediums',
    price: 45,
    originalPrice: 52,
    weight: '400 g',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    description: 'Creamy, thick set-curd with a mild taste. Free logically of chemical preservatives. High probiotic density facilitates digestive operations.',
    shelfLife: '6 days',
    benefits: ['Naturally rich in gut probiotic lactobacillus', 'Supports strong immune profiles', 'High calcium content'],
    nutrients: [
      { label: 'Protein', value: '3.6 g' },
      { label: 'Calcium', value: '110 mg' }
    ],
    rating: 4.8,
    reviewsCount: 6105
  },
  {
    id: 'do5',
    name: 'Fresh Malai Paneer Blocks',
    category: 'dairy-mediums',
    price: 88,
    originalPrice: 105,
    weight: '200 g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',
    description: 'Soft, melt-in-the-mouth cottage cheese blocks. Vaccum sealed to preserve moisture and freshness. Perfect for grilling or creamy shahi paneer.',
    shelfLife: '10 days',
    benefits: ['Excellent source of block protein', 'Rich in phosphorus and healthy minerals', 'Very low carbohydrate levels'],
    nutrients: [
      { label: 'Protein', value: '18.2 g' },
      { label: 'Fat', value: '20 g' }
    ],
    rating: 4.8,
    reviewsCount: 4210
  },
  {
    id: 'do6',
    name: 'Pasteurized Salted Butter',
    category: 'dairy-mediums',
    price: 56,
    originalPrice: 60,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
    description: 'Classic salted butter made of fresh milk cream. Indispensable for spreading on hot parathas, toast, or sautéing vegetables.',
    shelfLife: '30 days',
    benefits: ['Rich, smooth mouthfeel', 'Contains vital Vitamin A', 'Excellent cooking lubricant'],
    nutrients: [
      { label: 'Fat content', value: '80%' },
      { label: 'Sodium', value: '820 mg / 100g' }
    ],
    rating: 4.9,
    reviewsCount: 8410
  },
  {
    id: 'do7',
    name: 'Gourmet Cheese Slices',
    category: 'dairy-mediums',
    price: 135,
    originalPrice: 155,
    weight: '200 g (10 Slices)',
    image: 'https://images.unsplash.com/photo-1528254847116-fa2c03cb29cf?auto=format&fit=crop&q=80&w=400',
    description: 'Delicious processed cheese slices made from cow milk. Melts beautifully over grills, sandwiches, and hot burgers.',
    shelfLife: '45 days',
    benefits: ['Excellent melt factor', 'Individually wrapped slices', 'Rich in calcium'],
    nutrients: [
      { label: 'Protein', value: '16.5 g' },
      { label: 'Calcium', value: '540 mg' }
    ],
    rating: 4.7,
    reviewsCount: 2210
  },

  // --- SPICES & SEASONINGS ---
  {
    id: 'sc1',
    name: 'Whole Cumin Seeds (Jeera)',
    category: 'spices-condiments',
    price: 75,
    originalPrice: 95,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
    description: 'Aromatic cumin seeds with rich oil concentrations. Yields beautiful crackling splutters in oil (tadkas) and intense earthy scent.',
    shelfLife: '180 days',
    benefits: ['Enhances pancreatic enzyme activity for digestion', 'Rich source of iron mineral complexes', 'Strong natural antimicrobial properties'],
    nutrients: [
      { label: 'Volatile Oils', value: 'Active' },
      { label: 'Iron', value: '66 mg / 100g' }
    ],
    rating: 4.8,
    reviewsCount: 2950
  },
  {
    id: 'sc2',
    name: 'Pure Turmeric Powder (Haldi)',
    category: 'spices-condiments',
    price: 36,
    originalPrice: 48,
    weight: '200 g',
    image: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=400',
    description: 'High curcumin turmeric powder made from dry root fingers. Lends bright yellow color and earthy warmth to daily food recipes.',
    shelfLife: '180 days',
    benefits: ['High curcumin content acts as natural anti-inflammatory', 'Accelerates physical injury healing', 'Powerful antioxidant benefits'],
    nutrients: [
      { label: 'Curcumin', value: 'Minimum 3%' },
      { label: 'Calories', value: '354 kcal / 100g' }
    ],
    rating: 4.9,
    reviewsCount: 3104
  },
  {
    id: 'sc3',
    name: 'Kashmiri Red Chili Powder',
    category: 'spices-condiments',
    price: 64,
    originalPrice: 80,
    weight: '200 g',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
    description: 'Premium red chili powder yielding rich deep crimson food color with moderate spice pungency. Standard choice for curries and tikkas.',
    shelfLife: '180 days',
    benefits: ['Gives bright color without causing stomach distress', 'Rich in metabolism-boosting Vitamin C', 'Stimulates digestive enzymes'],
    nutrients: [
      { label: 'Sulfite', value: 'None' },
      { label: 'Capsaicin', value: 'Medium' }
    ],
    rating: 4.8,
    reviewsCount: 4210
  },
  {
    id: 'sc4',
    name: 'Supreme Garam Masala Blend',
    category: 'spices-condiments',
    price: 52,
    originalPrice: 65,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
    description: 'An operational master blend of roasted cinnamon, cardamoms, black pepper, and bay leaves. Perfect to dust over gravies for visual and fragrant finish.',
    shelfLife: '180 days',
    benefits: ['Brings warmth and elevates digestive fire', 'Rich in essential aromatic compounds', 'No food color adulterants'],
    nutrients: [
      { label: 'Whole Spices Used', value: '12 active' },
      { label: 'Preservatives', value: '0%' }
    ],
    rating: 4.8,
    reviewsCount: 1610
  },
  {
    id: 'sc5',
    name: 'Iodized Premium Table Salt',
    category: 'spices-condiments',
    price: 24,
    originalPrice: 28,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7accf?auto=format&fit=crop&q=80&w=400',
    description: 'Vacuum evaporated iodized salt. Extra fine crystals dissolve uniformly to season salads, curries, and dough complexes.',
    shelfLife: '730 days',
    benefits: ['Essential iodine prevents thyroid disorders', 'Flow regulators prevent clumping in humid jars', 'Pure dietary salinity'],
    nutrients: [
      { label: 'Sodium', value: '38.7 g / 100g' },
      { label: 'Iodine', value: '15 mcg' }
    ],
    rating: 4.9,
    reviewsCount: 14200
  },
  {
    id: 'sc6',
    name: 'Organic Premium Jaggery Powder',
    category: 'spices-condiments',
    price: 72,
    originalPrice: 90,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1608219159937-2598bebc2005?auto=format&fit=crop&q=80&w=400',
    description: 'A healthy substitute for white sugar. Made from organic sugarcane juice clarified with plant extracts. Free of chemicals or bleach.',
    shelfLife: '180 days',
    benefits: ['Highly rich in organic iron and calcium', 'Cleanses lungs and digestive tracts', 'Releases glycemic energies gradually'],
    nutrients: [
      { label: 'Iron', value: '11.4 mg' },
      { label: 'Carbs', value: '95 g' }
    ],
    rating: 4.7,
    reviewsCount: 1980
  },

  // --- BREAKFAST & DRINKS ---
  {
    id: 'bb1',
    name: 'Organic Rolled Wheat Oats',
    category: 'breakfast-beverages',
    price: 185,
    originalPrice: 230,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=400',
    description: 'High-fiber flat rolled oats. Softens beautifully on cooking in milk. Excellent for weight loss, dynamic morning porridges, or healthy baking.',
    shelfLife: '120 days',
    benefits: ['Enriched with Beta-Glucan fiber which lowers cholesterol', 'Provides long-lasting morning satiety', 'Low on glycemic impact'],
    nutrients: [
      { label: 'Beta-Glucan', value: '3.6 g' },
      { label: 'Protein', value: '11.8 g' }
    ],
    rating: 4.8,
    reviewsCount: 2210
  },
  {
    id: 'bb2',
    name: 'Assam Premium CTC Tea',
    category: 'breakfast-beverages',
    price: 145,
    originalPrice: 175,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    description: 'Handpicked CTC tea leaves from lush Assam estates. Yields deep red liquor color and strong malt flavor, perfect for aromatic ginger milk tea (Chai).',
    shelfLife: '240 days',
    benefits: ['Rich in catechins and heart-protective antioxidants', 'Fights morning grogginess instantly', 'Brings warmth and sensory focus'],
    nutrients: [
      { label: 'Polyphenols', value: 'Active' },
      { label: 'Caffeine', value: 'Moderate' }
    ],
    rating: 4.8,
    reviewsCount: 6890
  },
  {
    id: 'bb3',
    name: 'Rich Classic Instant Coffee',
    category: 'breakfast-beverages',
    price: 178,
    originalPrice: 210,
    weight: '100 g Glass Jar',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
    description: 'Perfect blend of Robusta and Arabica coffee beans spray-dried to locks in rich aroma. Dissolves in hot milk or water to elevate wakefulness.',
    shelfLife: '360 days',
    benefits: ['Sharpens mental alert indexes', 'Accelerates fat oxidation during aerobic drills', 'Brings warmth and focus'],
    nutrients: [
      { label: 'Caffeine', value: '75 mg/cup' },
      { label: 'Antioxidants', value: 'Polyphenol rich' }
    ],
    rating: 4.7,
    reviewsCount: 4210
  },
  {
    id: 'bb4',
    name: 'Organic Sweet Tomato Ketchup',
    category: 'breakfast-beverages',
    price: 99,
    originalPrice: 120,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?auto=format&fit=crop&q=80&w=400',
    description: 'Rich, glossy tomato ketchup made with sun-ripened tomatoes. Free of gluten or excess stabilizers, ideal dipping companion for parathas or fries.',
    shelfLife: '120 days',
    benefits: ['Natural lycopene source', 'No synthetic red coloring', 'Delicious sweet/salty equilibrium'],
    nutrients: [
      { label: 'Sugar Content', value: '18%' },
      { label: 'Tomato Paste', value: 'Minimum 28%' }
    ],
    rating: 4.6,
    reviewsCount: 2210
  },
  {
    id: 'bb5',
    name: 'Fresh Whole Wheat Sandwich Bread',
    category: 'breakfast-beverages',
    price: 45,
    originalPrice: 50,
    weight: '400 g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    description: 'Soft-sliced daily sandwich loaf baked of whole wheat. Contains zero refined flours. High fiber crumb perfect for toast or morning sandwiches.',
    shelfLife: '3 days',
    benefits: ['Zero refined grain content', 'Good plant-based dietary fibers', 'Ideal for crisp breakfast toasts'],
    nutrients: [
      { label: 'Protein / 2 slices', value: '6 g' },
      { label: 'Dietary Fiber', value: '3.4 g' }
    ],
    rating: 4.8,
    reviewsCount: 1680
  },

  // --- SNACKS & FOODS ---
  {
    id: 'sn1',
    name: 'Classic Crispy Bhujia Sev',
    category: 'snacks-packaged',
    price: 48,
    originalPrice: 55,
    weight: '150 g',
    image: 'https://images.unsplash.com/photo-1589476993333-f55b84301219?auto=format&fit=crop&q=80&w=400',
    description: 'A traditional Indian recipe of fine crunchy moth bean and gram flour strings, spiked with cardamoms, ginger powders, and black pepper spices.',
    shelfLife: '90 days',
    benefits: ['Trans-fat of 0g', 'Traditional light recipe digestability', 'Extremely crispy and delicious with tea'],
    nutrients: [
      { label: 'Sodium', value: '620 mg' },
      { label: 'Protein', value: '13 g' }
    ],
    rating: 4.8,
    reviewsCount: 3890
  },
  {
    id: 'sn2',
    name: 'Roasted Mint Foxnuts (Makhana)',
    category: 'snacks-packaged',
    price: 88,
    originalPrice: 110,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400',
    description: 'Slow-roasted crispy lotus seeds seasoned with mint powder and rock salt. The ultimate guilt-free, low-calorie snacking alternative.',
    shelfLife: '90 days',
    benefits: ['Exceptionally low Glycemic Index', 'Contains anti-aging enzymes', 'Rich source of trace minerals magnesium and phosphorus'],
    nutrients: [
      { label: 'Calories', value: '88 kcal / cup' },
      { label: 'Dietary Energy', value: '350 kcal' }
    ],
    rating: 4.9,
    reviewsCount: 1450
  },
  {
    id: 'sn3',
    name: 'Classic Salted Kettle Chips',
    category: 'snacks-packaged',
    price: 35,
    originalPrice: 40,
    weight: '100 g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400',
    description: 'Golden, potato chips kettle-cooked in small batches. Sparsed with sea salt crystals for crunch satisfaction.',
    shelfLife: '60 days',
    benefits: ['Gluten-free recipe formulation', 'Zero trans-oils used', 'Extremely crispy structure'],
    nutrients: [
      { label: 'Sodium', value: '110 mg' },
      { label: 'Dietary Fiber', value: '1.4 g' }
    ],
    rating: 4.5,
    reviewsCount: 1610
  },
  {
    id: 'sn4',
    name: 'Maggi 2-Min Masala Noodles',
    category: 'snacks-packaged',
    price: 56,
    originalPrice: 60,
    weight: '4-Pack Combo',
    image: 'https://images.unsplash.com/photo-1612966608963-47da380dc06a?auto=format&fit=crop&q=80&w=400',
    description: 'The legendary taste of 2-minute instant noodles containing an iconic tastemaker packet of 12 roasted spices. Simple, fast comfort food.',
    shelfLife: '120 days',
    benefits: ['Cooks instantly in under 3 minutes', 'Ideal snack for late night cravings', 'Fortified with iron mineral additives'],
    nutrients: [
      { label: 'Iron Content', value: '15% DV' },
      { label: 'Protein Value', value: '4.8 g' }
    ],
    rating: 4.9,
    reviewsCount: 18200
  },

  // --- BAKING & GLOBAL ---
  {
    id: 'bg1',
    name: 'Pure Cocoa Powder (Baking)',
    category: 'baking-global',
    price: 145,
    originalPrice: 175,
    weight: '150 g',
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&q=80&w=400',
    description: 'Pure, unsweetened dark cocoa powder. Standard choice for baking dense chocolate cakes, brownies, or preparing creamy hot cocoa mugs.',
    shelfLife: '180 days',
    benefits: ['Contains excellent concentrations of flavonol antioxidants', 'Sugar-free pure baking component', 'Promotes physical mood elevation'],
    nutrients: [
      { label: 'Cocoa content', value: '100% Raw' },
      { label: 'Dietary Fiber', value: '29% DV' }
    ],
    rating: 4.8,
    reviewsCount: 890
  },
  {
    id: 'bg2',
    name: 'Apple Cider Vinegar with Mother',
    category: 'baking-global',
    price: 199,
    originalPrice: 250,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1622484211148-7170a48b8fd3?auto=format&fit=crop&q=80&w=400',
    description: 'Raw, unfiltered apple cider vinegar. Naturally contains the "Mother of Vinegar" cloud. Perfect for raw salad dressings or morning health rituals.',
    shelfLife: '540 days',
    benefits: ['Supports glucose metabolic pathways', 'Excellent digestive booster tonic', 'Sourced organically from fresh apples'],
    nutrients: [
      { label: 'Acidity Index', value: '5%' },
      { label: 'Sodium Content', value: '0%' }
    ],
    rating: 4.8,
    reviewsCount: 1625
  },
  {
    id: 'bg3',
    name: 'Spicy Chili Flakes & Oregano Combo',
    category: 'baking-global',
    price: 85,
    originalPrice: 110,
    weight: 'Combo Pack (100g)',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
    description: 'Dual pack of premium crushed red chili flakes and dried wild oregano seasoning. Excellent sprinkling additions for home-cooked pizzas and pastas.',
    shelfLife: '180 days',
    benefits: ['Aromatic oregano oils support respiration', 'Adds dynamic visual zest', 'Authentic pizzeria herb blend'],
    nutrients: [
      { label: 'Chili Flakes', value: '50 g (heat-dried)' },
      { label: 'Oregano', value: '50 g (air-purified)' }
    ],
    rating: 4.7,
    reviewsCount: 940
  },

  // --- HOUSEHOLD & CARE ---
  {
    id: 'hc1',
    name: 'Sandalwood & Aloe Handwash',
    category: 'household-personal',
    price: 125,
    originalPrice: 150,
    weight: '250 ml Pump',
    image: 'https://images.unsplash.com/photo-1603178455924-ef33372953bb?auto=format&fit=crop&q=80&w=400',
    description: 'Moisturizing hand wash formulated with skin-pH-friendly organic aloe vera extract and pure natural sandalwood essential aroma oils.',
    shelfLife: '730 days',
    benefits: ['Eliminates 99.9% of bacteria without stripping moisture', 'Dermatologically evaluated safe for sensitive skin', 'Calming earthy sandalwood aromatherapy'],
    nutrients: [
      { label: 'Skin pH Index', value: '5.5' },
      { label: 'Active Botanicals', value: 'Aloe Vera + Sandalwood' }
    ],
    rating: 4.7,
    reviewsCount: 2210
  },
  {
    id: 'hc2',
    name: 'Dishwash Lemon Power Gel',
    category: 'household-personal',
    price: 110,
    originalPrice: 130,
    weight: '500 ml Refill',
    image: 'https://images.unsplash.com/photo-1607006342411-91f15712c6a0?auto=format&fit=crop&q=80&w=400',
    description: 'High concentration dishwashing gel enriched with natural lemon enzymes. Dissolves grease fast, cleaning stainless steel and glassware perfectly.',
    shelfLife: '730 days',
    benefits: ['Active lemon acids clear odors effortlessly', 'Requires only a small squeeze to clean full loads', 'Gentle on naked hands during washes'],
    nutrients: [
      { label: 'Grease Dissolve Index', value: 'Excellent' },
      { label: 'Lemon extracts', value: 'Real citrus juices' }
    ],
    rating: 4.7,
    reviewsCount: 3105
  },
  {
    id: 'hc3',
    name: 'Premium Liquid Laundry Detergent',
    category: 'household-personal',
    price: 199,
    originalPrice: 245,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400',
    description: 'Multi-enzyme liquid detergent designed for safe top/front load washer operations. Cleans deep inside fabrics, maintaining brightness.',
    shelfLife: '730 days',
    benefits: ['Dissolves quickly with zero white powders left behind', 'Neutral pH protects delicate threads', 'Lively floral fragrance lasts post washes'],
    nutrients: [
      { label: 'Enzymes Used', value: '4 active complexes' },
      { label: 'Fabric friendly', value: 'Silicon softeners active' }
    ],
    rating: 4.8,
    reviewsCount: 3980
  },
  {
    id: 'hc4',
    name: 'Herbal Citrus Surface Cleaner',
    category: 'household-personal',
    price: 135,
    originalPrice: 165,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    description: 'Disinfectant surface cleaner formulated with natural pine extracts and citrus peel oils. Safe on marble, tiles, and wood surfaces.',
    shelfLife: '730 days',
    benefits: ['Kills 99.9% germs', 'Leaves a fresh refreshing air citrus scent', 'Free of harsh chlorine bleach'],
    nutrients: [
      { label: 'Germicidal rate', value: '99.9%' },
      { label: 'Base Essential', value: 'Pine & Citrus' }
    ],
    rating: 4.8,
    reviewsCount: 2210
  },
  {
    id: 'hc5',
    name: 'Organic Bamboo Sanitary Pads',
    category: 'household-personal',
    price: 180,
    originalPrice: 220,
    weight: '15 pcs Box',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=400',
    description: 'Biodegradable, chemical-free sanitary pads woven from natural organic bamboo fibers. Extra absorbent core, completely chlorine and toxin-free.',
    shelfLife: '1095 days',
    benefits: ['Hypoallergenic with zero plastic contact layers', 'Highly breathable and anti-odor', 'Biodegradable and eco-friendly'],
    nutrients: [
      { label: 'Chlorine traces', value: '0%' },
      { label: 'Bamboo fiber density', value: 'Ultra soft absorbent' }
    ],
    rating: 4.9,
    reviewsCount: 1680
  },

  // --- INFANT & BABY CARE ---
  {
    id: 'bc1',
    name: 'Wheat Apple Baby Cereal (Cerelac)',
    category: 'baby-care',
    price: 195,
    originalPrice: 220,
    weight: '300 g Pack',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400',
    description: 'Balanced infant cereal nutrition for babies aged 8 months and above. Fortified with essential vitamins, iron, and mineral salts.',
    shelfLife: '180 days',
    benefits: ['Contains easy to digest pre-gelatinized starch', 'Promotes physical development indices', 'Enriched with iron and zinc'],
    nutrients: [
      { label: 'Vitamins', value: '18 essentials' },
      { label: 'Iron Content', value: '7.5 mg' }
    ],
    rating: 4.8,
    reviewsCount: 2980
  },
  {
    id: 'bc2',
    name: 'Premium Soft Cotton Diapers',
    category: 'baby-care',
    price: 380,
    originalPrice: 450,
    weight: 'Medium-20 Pcs',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400',
    description: 'Premium baby diapers lined with soft organic cotton. Features double absorption channels to prevent leakages and keep babies dry.',
    shelfLife: '1095 days',
    benefits: ['Prevents skin rashes via high air circulation design', 'Gentle elastic secure bands', 'Wetness visual change indicator active'],
    nutrients: [
      { label: 'Chlorine / Latex traces', value: '0%' },
      { label: 'Softness Rating', value: 'Premium Silk Touch' }
    ],
    rating: 4.8,
    reviewsCount: 5410
  },
  {
    id: 'bc3',
    name: 'Gentle No-Tears Baby Shampoo',
    category: 'baby-care',
    price: 155,
    originalPrice: 180,
    weight: '200 ml Bottle',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400',
    description: 'As gentle to the eyes as pure water. Formulated with organic chamomile extract to gently wash delicate baby hair while softening scalps.',
    shelfLife: '730 days',
    benefits: ['Hypoallergenic pH 5.5 safe formula', 'No-tears eye friendly composition', 'Free of synthetic parabens, soap, or color dyes'],
    nutrients: [
      { label: 'Sulfate traces', value: '0%' },
      { label: 'pH balance', value: '5.5 (Skin Friendly)' }
    ],
    rating: 4.9,
    reviewsCount: 1850
  }
];

export const MOCK_RIDER: DeliveryRider = {
  name: "Vikram 'Vicky' Rathore",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  rating: 4.95,
  vehicleNumber: "KA-03-HA-8841 (Electric Scooter)"
};

export const PROMO_SLIDES = [
  {
    id: 'prm1',
    title: 'Instant Delivery ⚡',
    subtitle: 'Under 10 minutes or it is free!',
    badge: '10 Mins',
    bgClass: 'bg-gradient-to-r from-green-600 via-teal-700 to-emerald-800'
  },
  {
    id: 'prm2',
    title: 'Flat 50% Cashback',
    subtitle: 'On your first 3 organic-veg orders',
    badge: 'FRESH50',
    bgClass: 'bg-gradient-to-r from-orange-500 via-amber-600 to-red-600'
  },
  {
    id: 'prm3',
    title: 'Midnight Cravings? 🌌',
    subtitle: 'We deliver 24/7 hyper-locally!',
    badge: 'NIGHTOWL',
    bgClass: 'bg-gradient-to-r from-blue-900 via-indigo-950 to-violet-950'
  }
];
