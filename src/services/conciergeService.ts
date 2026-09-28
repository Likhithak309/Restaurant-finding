import { INITIAL_RESTAURANTS } from '../data/seedRestaurants';
import { Restaurant } from '../types/restaurant';

/**
 * Intelligent dining assistant that provides instant recommendations and answers
 * when the external n8n workflow encounters an unhandled node exception.
 */
export function generateConciergeResponse(query: string): string {
  const q = query.toLowerCase();

  // 1. Italian
  if (q.includes('italian') || q.includes('pasta') || q.includes('cacio') || q.includes('cannoli')) {
    const trattoria = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-3');
    const cafe = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-12');
    return `Here are the top-rated Italian spots:\n\n1. **${trattoria?.name}** (★ ${trattoria?.rating}, $$) - Famous for handmade Cacio e Pepe ($24) and Ligurian roasted branzino at ${trattoria?.address}.\n2. **${cafe?.name}** (★ ${cafe?.rating}, $) - Historic North Beach espresso bar with fresh Sicilian Pistachio Cannoli ($6) at ${cafe?.address}.`;
  }

  // 2. Japanese / Sushi
  if (q.includes('japanese') || q.includes('sushi') || q.includes('omakase') || q.includes('wagyu')) {
    const sushizan = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-2');
    return `For Japanese cuisine, **${sushizan?.name}** is our highest-rated omakase destination (★ ${sushizan?.rating}, $$$$). It offers a 16-course chef omakase ($175), Hokkaido Uni Toast ($26), and A5 Miyazaki Wagyu nigiri with Tokyo Toyosu-sourced fish at ${sushizan?.address}.`;
  }

  // 3. French
  if (q.includes('french') || q.includes('bistro') || q.includes('duck') || q.includes('wine')) {
    const french = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-1');
    return `**${french?.name}** (★ ${french?.rating}, $$$) is an acclaimed Provencal bistro. Signature dishes include Duck Confit with Fig Reduction ($38) and Truffle Agnolotti ($34), paired with biodynamic wines at ${french?.address}.`;
  }

  // 4. Mexican
  if (q.includes('mexican') || q.includes('taco') || q.includes('mole') || q.includes('mezcal')) {
    const cantina = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-4');
    return `**${cantina?.name}** (★ ${cantina?.rating}, $$) is known for slow-simmered Mole Negro Oaxaqueño ($29), Tlayudas Mixtas ($22), and over 150 artisanal mezcals at ${cantina?.address}.`;
  }

  // 5. Steak / Steakhouse
  if (q.includes('steak') || q.includes('meat') || q.includes('ribeye') || q.includes('beef')) {
    const steak = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-7');
    return `**${steak?.name}** (★ ${steak?.rating}, $$$$) specializes in 45-day dry-aged USDA Prime cuts, tableside martinis, and Truffled Potato Gratin ($18) at ${steak?.address}.`;
  }

  // 6. Seafood / Oysters
  if (q.includes('seafood') || q.includes('oyster') || q.includes('crab') || q.includes('fish')) {
    const seafood = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-5');
    return `**${seafood?.name}** (★ ${seafood?.rating}, $$$) features bayfront dining with Pacific Oyster Platters ($42), fresh Dungeness Crab Rolls ($34), and classic SF Cioppino ($38) at ${seafood?.address}.`;
  }

  // 7. Vegetarian / Vegan
  if (q.includes('vegan') || q.includes('vegetarian') || q.includes('plant') || q.includes('healthy')) {
    const vegan = INITIAL_RESTAURANTS.find((r) => r.id === 'sf-10');
    return `**${vegan?.name}** (★ ${vegan?.rating}, $$) serves 100% plant-based farm-to-table cuisine, including Maitake Mushroom Steak ($27) and Cashew Ricotta Agnolotti ($25) at ${vegan?.address}.`;
  }

  // 8. Cheap / Under $15 / Budget / Affordable
  if (q.includes('cheap') || q.includes('under') || q.includes('budget') || q.includes('affordable') || q.includes('$15') || q.includes('inexpensive')) {
    const cheapPlaces = INITIAL_RESTAURANTS.filter((r) => r.priceLevel === 1);
    const list = cheapPlaces.map((r) => `• **${r.name}** (★ ${r.rating}, $) - ${r.cuisine}: ${r.popularDishes?.[0]?.name} (${r.popularDishes?.[0]?.price})`).join('\n');
    return `Here are top-rated budget-friendly options under $15 per person:\n\n${list}`;
  }

  // 9. Open Now
  if (q.includes('open now') || q.includes('currently open') || q.includes('open late') || q.includes('hours')) {
    const openPlaces = INITIAL_RESTAURANTS.filter((r) => r.isOpenNow).slice(0, 3);
    const list = openPlaces.map((r) => `• **${r.name}** (★ ${r.rating}, ${'$'.repeat(r.priceLevel)}) - ${r.cuisine}`).join('\n');
    return `The following high-rated restaurants are currently open for dine-in:\n\n${list}\n\nCheck individual cards for exact hours and menu options!`;
  }

  // 10. General top recommendations
  const topThree = [...INITIAL_RESTAURANTS].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const formatted = topThree.map((r, i) => `${i + 1}. **${r.name}** (★ ${r.rating}, ${'$'.repeat(r.priceLevel)}) - ${r.cuisine}: ${r.summary}`).join('\n\n');
  return `Here are our top 3 highest-rated culinary venues:\n\n${formatted}\n\nYou can filter by cuisine or price tier anytime using the filter bar above!`;
}
