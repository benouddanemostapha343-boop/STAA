/**
 * aiService.js
 * AI-powered insights and travel planning logic
 */

export function generateInsights(wilaya) {
  const insights = [];
  const { score, hotels, accessibility, rating, sites } = wilaya;

  if (score > 80 && hotels < 10) {
    insights.push({
      type: 'opportunity',
      icon: '🏨',
      text: 'Strong tourism potential but lacks accommodation infrastructure. Investment in hotels recommended.',
    });
  }
  if (accessibility < 40) {
    insights.push({
      type: 'warning',
      icon: '🛣️',
      text: 'Transportation development strongly recommended to unlock this wilaya\'s tourism potential.',
    });
  }
  if (rating > 4.5) {
    insights.push({
      type: 'positive',
      icon: '⭐',
      text: 'High visitor satisfaction recorded. Focus on capacity expansion to accommodate growth.',
    });
  }
  if (sites > 300 && hotels < 50) {
    insights.push({
      type: 'opportunity',
      icon: '📈',
      text: 'Rich in tourist sites but underserved by hospitality sector. High ROI opportunity for investors.',
    });
  }
  if (score < 50) {
    insights.push({
      type: 'info',
      icon: '🔧',
      text: 'Comprehensive development plan needed across infrastructure, hospitality, and site preservation.',
    });
  }
  if (insights.length === 0) {
    insights.push({
      type: 'positive',
      icon: '✅',
      text: 'Well-balanced tourism ecosystem with solid indicators across all metrics.',
    });
  }
  return insights;
}

export function generateTripPlan(type, days, budget) {
  const plans = {
    Desert: {
      Low: ['Ghardaïa Old City', 'Ouargla Oasis', 'Biskra Palm Groves'],
      Medium: ['Tamanrasset Hoggar', 'Djanet Tassili', 'Ghardaïa M\'Zab'],
      High: ['Tamanrasset VIP Camp', 'Private Sahara Trek', 'Luxury Desert Lodge'],
    },
    History: {
      Low: ['Tipaza Ruins', 'Djémila Ruins', 'Timgad Ruins'],
      Medium: ['Tlemcen Old City', 'Constantine Bridges', 'Alger Casbah'],
      High: ['Constantine + Annaba + Sétif Tour', 'Premium Guided Heritage Tour', 'VIP Museum Access'],
    },
    Beach: {
      Low: ['Jijel Coast', 'Béjaïa Bay', 'Mostaganem Beach'],
      Medium: ['Annaba Plage', 'Oran Corniche', 'Club Méditerranée'],
      High: ['Private Beach Resort Oran', 'Luxury Annaba Seafront', 'Premium Béjaïa Eco-Resort'],
    },
    Adventure: {
      Low: ['Chréa National Park', 'Djurdjura Trails', 'Taza Gorges'],
      Medium: ['Hoggar Trek', 'Tassili Camping', 'Atlas Crossing'],
      High: ['Private Hoggar Expedition', 'Heli-tour Sahara', 'Extreme Desert Crossing'],
    },
    Culture: {
      Low: ['Tlemcen Festivals', 'Ghardaïa Crafts Market', 'Constantine Music'],
      Medium: ['Alger Casbah Tour', 'Oran Cultural Week', 'Constantine Jazz Fest'],
      High: ['VIP Cultural Immersion', 'Private Gallery Tours', 'Culinary Heritage Tour'],
    },
  };

  const destinations = plans[type]?.[budget] || plans.History.Medium;

  return Array.from({ length: Number(days) }, (_, i) => ({
    day: i + 1,
    destination: destinations[i % destinations.length],
    activity: getActivity(type, i),
    accommodation: getAccommodation(budget),
    meals: getMeals(budget),
  }));
}

function getActivity(type, day) {
  const activities = {
    Desert: ['Camel Trek at Sunrise', 'Sandboarding & Dune Exploration', 'Stargazing Camp Night', 'Oasis Village Visit', 'Desert Photography Walk', 'Berber Culture Evening', 'Traditional Crafts Workshop'],
    History: ['Guided Archaeological Site Tour', 'Museum Deep Dive', 'Old Medina Walking Tour', 'Ancient Ruins Photography', 'Local Historian Meeting', 'Heritage Craft Workshop', 'Roman Amphitheater Visit'],
    Beach: ['Morning Snorkeling', 'Coastal Kayaking', 'Cliff Diving', 'Seafood Gastronomy Tour', 'Sunset Sailing', 'Beach Volleyball Tournament', 'Underwater Photography'],
    Adventure: ['Mountain Hiking', 'Rock Climbing', 'Zip-lining', 'White Water Rafting', 'Cave Exploration', 'Paragliding', 'Off-road 4x4 Safari'],
    Culture: ['Traditional Cooking Class', 'Local Music Performance', 'Artisan Market Visit', 'Calligraphy Workshop', 'Tea Ceremony', 'Folk Dance Show', 'Storytelling Evening'],
  };
  return (activities[type] || activities.History)[day % 7];
}

function getAccommodation(budget) {
  const hotels = {
    Low: ['Budget Guesthouse (★★)', 'Youth Hostel', 'Family Riad'],
    Medium: ['Boutique Hotel (★★★)', 'Desert Camp', 'Heritage Riad (★★★)'],
    High: ['5-Star Luxury Resort', 'Private Desert Lodge', 'Presidential Suite'],
  };
  return hotels[budget]?.[0] || hotels.Medium[0];
}

function getMeals(budget) {
  const meals = {
    Low: 'Local restaurants & street food',
    Medium: 'Mix of local cuisine & hotel dining',
    High: 'Fine dining & private chef experiences',
  };
  return meals[budget] || meals.Medium;
}
