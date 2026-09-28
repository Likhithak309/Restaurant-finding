import { Restaurant } from '../types/restaurant';
import heroImg from '../assets/images/hero_dining_ambiance_1790578318090.jpg';
import bistroImg from '../assets/images/bistro_dish_plated_1790578332938.jpg';
import cafeImg from '../assets/images/cafe_patio_dining_1790578347408.jpg';

export const POPULAR_LOCATIONS = [
  { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
  { name: 'New York, NY', lat: 40.7128, lng: -74.0060 },
  { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
  { name: 'Seattle, WA', lat: 47.6062, lng: -122.3321 },
  { name: 'Austin, TX', lat: 30.2672, lng: -97.7431 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 }
];

export const CUISINE_CATEGORIES = [
  'All',
  'Italian',
  'Japanese',
  'French',
  'Mexican',
  'Mediterranean',
  'Seafood',
  'Steakhouse',
  'American',
  'Indian',
  'Thai',
  'Asian Fusion',
  'Vegetarian'
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'sf-1',
    name: 'L’Atelier du Soleil',
    rating: 4.9,
    userRatingCount: 1420,
    priceLevel: 3,
    cuisine: 'French',
    cuisines: ['French', 'Mediterranean', 'Wine Bar'],
    address: '450 Hayes Street, Hayes Valley, San Francisco, CA',
    lat: 37.7765,
    lng: -122.4242,
    isOpenNow: true,
    openingHours: ['Mon-Thu: 5:00 PM – 10:00 PM', 'Fri-Sat: 5:00 PM – 11:00 PM', 'Sun: 4:30 PM – 9:30 PM'],
    phoneNumber: '+1 (415) 555-0142',
    website: 'https://latelierdusoleil-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=450+Hayes+Street+San+Francisco',
    photos: [heroImg, bistroImg],
    summary: 'A luminous contemporary bistro offering seasonal Provencal tasting menus, biodynamic wine pairings, and wood-fired artisanal bread.',
    highlights: ['Outdoor Heated Patio', 'Michelin Recognized', 'Extensive Natural Wine List'],
    popularDishes: [
      { name: 'Duck Confit with Fig Reduction', price: '$38', description: 'Crisp skin, spiced Puy lentils, mission fig glaze', isPopular: true },
      { name: 'Handmade Truffle Agnolotti', price: '$34', description: 'Piedmontese black truffles, aged parmesan broth', isPopular: true },
      { name: 'Tarte Tatin with Cardamom Crème', price: '$16', description: 'Caramelized heirloom apples, flaky puff pastry' }
    ],
    reviews: [
      { author: 'Elena Rostova', rating: 5, text: 'One of the best dining experiences in the city. The duck confit melted in the mouth and the sommelier pair was divine.', relativeTime: '3 days ago' },
      { author: 'Marcus Chen', rating: 5, text: 'Attentive service and sublime acoustics. The agnolotti is an absolute masterclass in pasta craft.', relativeTime: '2 weeks ago' }
    ]
  },
  {
    id: 'sf-2',
    name: 'Sushizan Omakase Room',
    rating: 4.8,
    userRatingCount: 980,
    priceLevel: 4,
    cuisine: 'Japanese',
    cuisines: ['Japanese', 'Sushi', 'Omakase'],
    address: '680 Geary Street, Tenderloin, San Francisco, CA',
    lat: 37.7862,
    lng: -122.4168,
    isOpenNow: true,
    openingHours: ['Tue-Sun: 5:30 PM – 10:30 PM', 'Closed Monday'],
    phoneNumber: '+1 (415) 555-0189',
    website: 'https://sushizan-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=680+Geary+Street+San+Francisco',
    photos: [bistroImg, heroImg],
    summary: 'Intimate 12-seat cedar counter serving Tokyo Toyosu market wild-caught nigiri, seasonal binchotan charcoal grills, and rare Junmai Daiginjo sakes.',
    highlights: ['Edomae Style', 'Counter Seating Only', 'Direct Tokyo Sourcing'],
    popularDishes: [
      { name: '16-Course Chef Omakase', price: '$175', description: 'Wild sea urchin, otoro nigiri, charcoal smoked kinmedai', isPopular: true },
      { name: 'Hokkaido Uni Toast', price: '$26', description: 'Brioche toast, cured egg yolk, shiso flower', isPopular: true },
      { name: 'A5 Miyazaki Wagyu Nigiri', price: '$28', description: 'Lightly torched with fresh wasabi and black salt' }
    ],
    reviews: [
      { author: 'David K.', rating: 5, text: 'Every piece was flawless. The balance of warm red vinegar rice and chilled fish was sheer perfection.', relativeTime: '1 week ago' },
      { author: 'Sarah L.', rating: 4, text: 'Incredible quality. Hard to book a seat, but completely worth the anticipation.', relativeTime: '3 weeks ago' }
    ]
  },
  {
    id: 'sf-3',
    name: 'Trattoria Portofino',
    rating: 4.7,
    userRatingCount: 2150,
    priceLevel: 2,
    cuisine: 'Italian',
    cuisines: ['Italian', 'Pasta', 'Wine Bar'],
    address: '1520 Stockton Street, North Beach, San Francisco, CA',
    lat: 37.8005,
    lng: -122.4089,
    isOpenNow: true,
    openingHours: ['Daily: 11:30 AM – 10:30 PM'],
    phoneNumber: '+1 (415) 555-0174',
    website: 'https://trattoriaportofino-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=1520+Stockton+Street+San+Francisco',
    photos: [cafeImg, bistroImg],
    summary: 'Vibrant neighborhood trattoria known for handmade ribbons of tagliatelle, 72-hour sourdough focaccia, and wood-fired Ligurian branzino.',
    highlights: ['Handmade Fresh Pasta', 'North Beach Icon', 'Cozy Sidewalk Seating'],
    popularDishes: [
      { name: 'Cacio e Pepe Al Tartufo', price: '$24', description: 'Tonnarelli pasta, toasted Tellicherry peppercorn, Pecorino Romano', isPopular: true },
      { name: 'Whole Roasted Branzino', price: '$36', description: 'Ligurian olive oil, fresh rosemary, charred lemon', isPopular: true },
      { name: 'Classic Tiramisu al Mascarpone', price: '$12', description: 'Espresso soaked savoiardi with Valrhona cocoa' }
    ],
    reviews: [
      { author: 'Giulia V.', rating: 5, text: 'Tastes like Nonna’s kitchen in Florence. The cacio e pepe sauce clung to the noodles like silk.', relativeTime: 'Yesterday' },
      { author: 'Brian H.', rating: 4.5, text: 'Bustling, warm, great wine selection under $60. Come early or expect a friendly wait at the bar.', relativeTime: '5 days ago' }
    ]
  },
  {
    id: 'sf-4',
    name: 'Osteria Cantina Oaxaca',
    rating: 4.8,
    userRatingCount: 1670,
    priceLevel: 2,
    cuisine: 'Mexican',
    cuisines: ['Mexican', 'Oaxacan', 'Mezcal Bar'],
    address: '2840 24th Street, Mission District, San Francisco, CA',
    lat: 37.7529,
    lng: -122.4098,
    isOpenNow: true,
    openingHours: ['Mon-Fri: 4:00 PM – 11:00 PM', 'Sat-Sun: 12:00 PM – 11:00 PM'],
    phoneNumber: '+1 (415) 555-0133',
    website: 'https://cantinaoaxaca-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=2840+24th+Street+San+Francisco',
    photos: [bistroImg, cafeImg],
    summary: 'Celebrated sanctuary of heirloom corn tortillas, complex slow-simmered moles, and over 150 artisanal mezcals from family palenques.',
    highlights: ['House-ground Masa', 'Craft Mezcal Flights', 'Live Latin Jazz Thursdays'],
    popularDishes: [
      { name: 'Mole Negro Oaxaqueño', price: '$29', description: 'Braised duck leg, 32-ingredient chile mole, toasted sesame, red rice', isPopular: true },
      { name: 'Tlayuda Mixta', price: '$22', description: 'Crisp corn tortilla, quesillo, black bean paste, cecina, avocado', isPopular: true },
      { name: 'Smoked Mezcal Paloma', price: '$15', description: 'Artisanal espadin, fresh ruby red grapefruit, sal de gusano rim' }
    ],
    reviews: [
      { author: 'Raquel M.', rating: 5, text: 'The depth of the mole negro is staggering. You can taste the chocolate, dried chilies, and decades of tradition.', relativeTime: '4 days ago' }
    ]
  },
  {
    id: 'sf-5',
    name: 'Coastline Oyster & Raw Bar',
    rating: 4.7,
    userRatingCount: 1890,
    priceLevel: 3,
    cuisine: 'Seafood',
    cuisines: ['Seafood', 'Raw Bar', 'American'],
    address: '1 Ferry Building, The Embarcadero, San Francisco, CA',
    lat: 37.7955,
    lng: -122.3937,
    isOpenNow: true,
    openingHours: ['Daily: 11:00 AM – 9:00 PM'],
    phoneNumber: '+1 (415) 555-0155',
    website: 'https://coastlinesf.com',
    googleMapsUrl: 'https://maps.google.com/?q=1+Ferry+Building+San+Francisco',
    photos: [heroImg, cafeImg],
    summary: 'Panoramic bay views coupled with freshly shucked Pacific oysters, Dungeness crab rolls, and crisp Northern California sparkling wines.',
    highlights: ['Bayfront Dining', 'Daily Fresh Catch', 'Local Shellfish'],
    popularDishes: [
      { name: 'Dungeness Crab Roll', price: '$34', description: 'Warm butter brioche, brown butter mayo, chives, sea salt chips', isPopular: true },
      { name: 'Pacific Oyster Platter (12 pcs)', price: '$42', description: 'Kumamoto and Miyagi oysters, champagne mignonette, smoked cocktail sauce', isPopular: true },
      { name: 'San Francisco Cioppino', price: '$38', description: 'Clams, mussels, prawns, fresh rockfish in rich tomato-fennel brodo' }
    ],
    reviews: [
      { author: 'Liam S.', rating: 5, text: 'Sitting outside watching the ferry boats while enjoying Kumamoto oysters is the quintessence of SF living.', relativeTime: '2 weeks ago' }
    ]
  },
  {
    id: 'sf-6',
    name: 'Aura Mediterranean Hearth',
    rating: 4.9,
    userRatingCount: 1120,
    priceLevel: 3,
    cuisine: 'Mediterranean',
    cuisines: ['Mediterranean', 'Greek', 'Middle Eastern'],
    address: '520 Valencia Street, Mission District, San Francisco, CA',
    lat: 37.7645,
    lng: -122.4221,
    isOpenNow: false,
    openingHours: ['Tue-Sun: 5:00 PM – 10:00 PM', 'Closed Monday'],
    phoneNumber: '+1 (415) 555-0129',
    website: 'https://auramediterranean-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=520+Valencia+Street+San+Francisco',
    photos: [bistroImg, heroImg],
    summary: 'Sun-drenched Mediterranean kitchen centered around an open olive-wood grill, whipped feta mezze, and charred lamb chops.',
    highlights: ['Wood Fire Grill', 'Handmade Warm Pita', 'Zero-Proof Cocktails'],
    popularDishes: [
      { name: 'Charred Lamb Chops', price: '$42', description: 'Za’atar crust, smoked eggplant puree, pomegranate molasses', isPopular: true },
      { name: 'Whipped Feta & Wild Honey', price: '$18', description: 'Urfa pepper, toasted pistachios, fresh hot wood-fired pita', isPopular: true },
      { name: 'Whole Grilled Sea Bass', price: '$39', description: 'Kalamata oregano, grilled Meyer lemon, wild greens' }
    ],
    reviews: [
      { author: 'Chloe W.', rating: 5, text: 'The whipped feta is unforgettable. Make sure to order extra pita because you will scrape every drop.', relativeTime: '6 days ago' }
    ]
  },
  {
    id: 'sf-7',
    name: 'Prime & Ember Steakhouse',
    rating: 4.8,
    userRatingCount: 1340,
    priceLevel: 4,
    cuisine: 'Steakhouse',
    cuisines: ['Steakhouse', 'American', 'Cocktail Bar'],
    address: '333 Pine Street, Financial District, San Francisco, CA',
    lat: 37.7918,
    lng: -122.4012,
    isOpenNow: true,
    openingHours: ['Mon-Fri: 5:00 PM – 10:30 PM', 'Sat: 4:30 PM – 11:00 PM', 'Sun: Closed'],
    phoneNumber: '+1 (415) 555-0199',
    website: 'https://primeandember-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=333+Pine+Street+San+Francisco',
    photos: [heroImg, bistroImg],
    summary: 'Classic walnut-paneled sanctuary featuring 45-day dry-aged USDA Prime cuts, tableside martinis, and rich bone marrow butter.',
    highlights: ['45-Day Dry Aging Cellar', 'Tableside Martini Cart', 'Private Wine Vault'],
    popularDishes: [
      { name: '45-Day Dry-Aged Bone-In Ribeye (18oz)', price: '$85', description: 'Charred crust, roasted garlic, black peppercorn demi-glace', isPopular: true },
      { name: 'Truffled Potato Gratin', price: '$18', description: 'Gruyère cheese, black summer truffle, cream', isPopular: true },
      { name: 'Colossal Crab Cake', price: '$26', description: 'Jumbo lump blue crab, whole grain mustard remoulade' }
    ],
    reviews: [
      { author: 'Gregory T.', rating: 5, text: 'The ribeye had incredible funk and tenderness from the dry aging. Impeccable old-school hospitality.', relativeTime: '3 weeks ago' }
    ]
  },
  {
    id: 'sf-8',
    name: 'Spice Symphony Kitchen',
    rating: 4.7,
    userRatingCount: 1450,
    priceLevel: 2,
    cuisine: 'Indian',
    cuisines: ['Indian', 'Vegetarian', 'Curry'],
    address: '1698 Polk Street, Nob Hill, San Francisco, CA',
    lat: 37.7932,
    lng: -122.4208,
    isOpenNow: true,
    openingHours: ['Tue-Sun: 12:00 PM – 9:30 PM', 'Closed Monday'],
    phoneNumber: '+1 (415) 555-0162',
    website: 'https://spicesymphony-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=1698+Polk+Street+San+Francisco',
    photos: [bistroImg, cafeImg],
    summary: 'Modern coastal Indian cuisine celebrating slow-simmered regional curries, tandoori roasted specialties, and aromatic biryanis.',
    highlights: ['Tandoor Oven Specials', 'Extensive Vegan Menu', 'Craft Chai Service'],
    popularDishes: [
      { name: 'Smoked Butter Chicken', price: '$24', description: 'Tandoori chicken thighs in velvet fenugreek tomato gravy', isPopular: true },
      { name: 'Hyderabadi Lamb Dum Biryani', price: '$26', description: 'Aged basmati, saffron, caramelized onions, mint raita', isPopular: true },
      { name: 'Garlic & Rosemary Naan', price: '$6', description: 'Baked hot to order on clay tandoor walls' }
    ],
    reviews: [
      { author: 'Ananya S.', rating: 5, text: 'Finally an Indian restaurant that honors nuanced regional spicing rather than overwhelming heat. The biryani was fragrant and tender.', relativeTime: '1 week ago' }
    ]
  },
  {
    id: 'sf-9',
    name: 'Lotus & Lemongrass Bistro',
    rating: 4.8,
    userRatingCount: 890,
    priceLevel: 2,
    cuisine: 'Thai',
    cuisines: ['Thai', 'Southeast Asian', 'Street Food'],
    address: '730 Clement Street, Inner Richmond, San Francisco, CA',
    lat: 37.7831,
    lng: -122.4678,
    isOpenNow: true,
    openingHours: ['Daily: 11:30 AM – 10:00 PM'],
    phoneNumber: '+1 (415) 555-0118',
    website: 'https://lotuslemongrass-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=730+Clement+Street+San+Francisco',
    photos: [cafeImg, heroImg],
    summary: 'Authentic Northern Thai sanctuary featuring stone-ground khao soi curry, charcoal grilled skewers, and green papaya salads.',
    highlights: ['Chiang Mai Specialties', 'House Made Curry Pastes', 'Cozy Neighborhood Gem'],
    popularDishes: [
      { name: 'Chiang Mai Khao Soi', price: '$21', description: 'Egg noodles in rich coconut curry, braised chicken, pickled mustard greens, crispy noodle nest', isPopular: true },
      { name: 'Pork Belly Kra Prow', price: '$22', description: 'Crispy pork belly, holy basil, garlic bird’s eye chili, crispy fried egg', isPopular: true },
      { name: 'Mango Sticky Rice', price: '$11', description: 'Sweet coconut milk, toasted sesame, ripe honey mango' }
    ],
    reviews: [
      { author: 'Tara M.', rating: 5, text: 'The Khao Soi transported me straight back to the night markets in Chiang Mai. Exceptional crunch and aroma.', relativeTime: '5 days ago' }
    ]
  },
  {
    id: 'sf-10',
    name: 'Verdant Table Organic',
    rating: 4.9,
    userRatingCount: 760,
    priceLevel: 2,
    cuisine: 'Vegetarian',
    cuisines: ['Vegetarian', 'Vegan', 'Farm-to-Table'],
    address: '1890 Fillmore Street, Pacific Heights, San Francisco, CA',
    lat: 37.7889,
    lng: -122.4339,
    isOpenNow: true,
    openingHours: ['Wed-Sun: 11:00 AM – 9:00 PM'],
    phoneNumber: '+1 (415) 555-0105',
    website: 'https://verdanttable-sf.com',
    googleMapsUrl: 'https://maps.google.com/?q=1890+Fillmore+Street+San+Francisco',
    photos: [bistroImg, cafeImg],
    summary: 'Elevated 100% plant-based dining featuring produce directly harvested from certified regenerative Bay Area organic farms.',
    highlights: ['100% Organic & Vegan', 'Zero Waste Kitchen', 'Cold Pressed Elixirs'],
    popularDishes: [
      { name: 'Maitake Mushroom Steak', price: '$27', description: 'Wood-fired hen of the woods mushroom, celery root puree, charred ramp jus', isPopular: true },
      { name: 'Cashew Ricotta Agnolotti', price: '$25', description: 'Sweet pea reduction, lemon zest, edible borage blossoms', isPopular: true },
      { name: 'Wild Foraged Salad', price: '$18', description: 'Shaved radishes, pistachio crumble, green goddess tahini vinaigrette' }
    ],
    reviews: [
      { author: 'Jordan P.', rating: 5, text: 'You do not have to be vegan to fall in love with this place. The maitake mushroom dish is one of the top 3 dishes in SF.', relativeTime: '1 week ago' }
    ]
  },
  {
    id: 'sf-11',
    name: 'Cornerstone Burger & Tap',
    rating: 4.6,
    userRatingCount: 3100,
    priceLevel: 1,
    cuisine: 'American',
    cuisines: ['American', 'Burgers', 'Gastropub'],
    address: '2205 Polk Street, Russian Hill, San Francisco, CA',
    lat: 37.7981,
    lng: -122.4225,
    isOpenNow: true,
    openingHours: ['Daily: 11:30 AM – 11:00 PM'],
    phoneNumber: '+1 (415) 555-0177',
    website: 'https://cornerstoneburgersf.com',
    googleMapsUrl: 'https://maps.google.com/?q=2205+Polk+Street+San+Francisco',
    photos: [heroImg, cafeImg],
    summary: 'Beloved neighborhood craft burger haven famous for smashed dry-aged brisket patties, duck fat fries, and local microbrew taps.',
    highlights: ['Grass Fed Brisket Blend', 'Duck Fat Fries', 'Craft Beer on Tap'],
    popularDishes: [
      { name: 'The Double Smash Truffle Burger', price: '$15', description: 'Two 3oz patties, caramelized onion jam, aged white cheddar, truffle aioli, toasted brioche', isPopular: true },
      { name: 'Rosemary Garlic Duck Fat Fries', price: '$8', description: 'Crisp hand-cut potatoes tossed in duck fat, roasted garlic, fresh rosemary', isPopular: true },
      { name: 'House Salted Caramel Milkshake', price: '$9', description: 'Organic vanilla custard, house-made sea salt caramel' }
    ],
    reviews: [
      { author: 'Sam W.', rating: 5, text: 'Simply unbeatable value. The crispy lacy edges on the smash burger are culinary heaven.', relativeTime: '2 days ago' }
    ]
  },
  {
    id: 'sf-12',
    name: 'Il Vecchio Caffè',
    rating: 4.8,
    userRatingCount: 840,
    priceLevel: 1,
    cuisine: 'Italian',
    cuisines: ['Italian', 'Bakery', 'Cafe'],
    address: '540 Columbus Avenue, North Beach, San Francisco, CA',
    lat: 37.8011,
    lng: -122.4099,
    isOpenNow: true,
    openingHours: ['Daily: 7:00 AM – 7:00 PM'],
    phoneNumber: '+1 (415) 555-0149',
    website: 'https://ilvecchiocaffe.com',
    googleMapsUrl: 'https://maps.google.com/?q=540+Columbus+Avenue+San+Francisco',
    photos: [cafeImg, bistroImg],
    summary: 'Historic Italian espresso and pastry institution with handmade pistachio cannoli, freshly pulled Lever espresso, and sunny terrace benches.',
    highlights: ['Handmade Sicilian Cannoli', 'Lever Machine Espresso', 'Terrace Seating'],
    popularDishes: [
      { name: 'Sicilian Pistachio Cannoli', price: '$6', description: 'Crisp fried pastry shell filled to order with sweet ricotta and Bronte pistachios', isPopular: true },
      { name: 'Affogato al Caffè', price: '$7', description: 'Double espresso shot poured over artisanal Fior di Latte gelato', isPopular: true },
      { name: 'Prosciutto & Burrata Cornetto', price: '$10', description: 'Flaky Italian butter croissant with aged San Daniele prosciutto and creamy burrata' }
    ],
    reviews: [
      { author: 'Mario R.', rating: 5, text: 'Real Italian espresso roasted dark with thick crema. The cannoli is piped right when you order so the crust stays crunchy.', relativeTime: '4 days ago' }
    ]
  }
];

// Calculate Haversine distance between two coordinates in kilometers
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
