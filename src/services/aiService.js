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

export function generateTripPlan(type, days, budget, interests = []) {
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
  const activities = {
    Desert: [
      { label: 'Camel Trek at Sunrise', interests: ['adventure', 'nature'] },
      { label: 'Sandboarding & Dune Exploration', interests: ['adventure', 'nature'] },
      { label: 'Stargazing Camp Night', interests: ['nature', 'photography', 'relaxation'] },
      { label: 'Oasis Village Visit', interests: ['culture', 'history'] },
      { label: 'Desert Photography Walk', interests: ['photography', 'nature'] },
      { label: 'Berber Culture Evening', interests: ['culture', 'food'] },
      { label: 'Traditional Crafts Workshop', interests: ['culture'] },
    ],
    History: [
      { label: 'Guided Archaeological Site Tour', interests: ['history', 'adventure'] },
      { label: 'Museum Deep Dive', interests: ['history', 'culture'] },
      { label: 'Old Medina Walking Tour', interests: ['history', 'culture', 'photography', 'adventure'] },
      { label: 'Ancient Ruins Photography', interests: ['history', 'photography'] },
      { label: 'Local Historian Meeting', interests: ['history', 'culture'] },
      { label: 'Heritage Craft Workshop', interests: ['culture'] },
      { label: 'Traditional Food Tasting', interests: ['food', 'culture'] },
    ],
    Beach: [
      { label: 'Morning Snorkeling', interests: ['sea', 'adventure', 'nature'] },
      { label: 'Coastal Kayaking', interests: ['sea', 'adventure', 'nature'] },
      { label: 'Cliff Diving', interests: ['adventure', 'sea'] },
      { label: 'Seafood Gastronomy Tour', interests: ['food', 'culture'] },
      { label: 'Sunset Sailing', interests: ['sea', 'nature', 'relaxation'] },
      { label: 'Beach Volleyball Tournament', interests: ['adventure', 'sea'] },
      { label: 'Underwater Photography', interests: ['photography', 'sea'] },
    ],
    Adventure: [
      { label: 'Mountain Hiking', interests: ['adventure', 'nature'] },
      { label: 'Rock Climbing', interests: ['adventure', 'nature'] },
      { label: 'Zip-lining', interests: ['adventure'] },
      { label: 'White Water Rafting', interests: ['adventure', 'nature'] },
      { label: 'Cave Exploration', interests: ['adventure', 'nature', 'photography'] },
      { label: 'Paragliding', interests: ['adventure', 'nature'] },
      { label: 'Local Culture & Crafts Visit', interests: ['culture', 'photography'] },
    ],
    Culture: [
      { label: 'Traditional Cooking Class', interests: ['food', 'culture'] },
      { label: 'Local Music Performance', interests: ['culture'] },
      { label: 'Artisan Market Visit', interests: ['culture', 'food', 'photography'] },
      { label: 'Calligraphy Workshop', interests: ['culture'] },
      { label: 'Tea Ceremony', interests: ['culture', 'relaxation'] },
      { label: 'Folk Dance Show', interests: ['culture'] },
      { label: 'Storytelling Evening', interests: ['culture', 'history'] },
    ],
  }
  const activityOptions = activities[type] || activities.History

  return Array.from({ length: Number(days) }, (_, i) => ({
    day: i + 1,
    destination: destinations[i % destinations.length],
    activity: getActivity(activityOptions, i, interests),
    accommodation: getAccommodation(budget),
    meals: getMeals(budget),
  }));
}

function getActivity(activities, day, interests) {
  const options = interests.length
    ? [...activities].sort((first, second) => {
      const firstMatches = first.interests.filter(interest => interests.includes(interest)).length
      const secondMatches = second.interests.filter(interest => interests.includes(interest)).length
      return secondMatches - firstMatches
    })
    : activities
  return options[day % options.length].label
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
