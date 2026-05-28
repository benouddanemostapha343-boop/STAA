/**
 * analyticsService.js
 * Data analytics and aggregation for tourism data
 */

import { calcTourismScore } from './geoService';
import tourismData from '../data/tourism.json';

export function enrichWilayas() {
  return tourismData.map(w => ({
    ...w,
    score: calcTourismScore(w),
  }));
}

export function getTopWilayas(n = 5) {
  return enrichWilayas()
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

export function getKPIs() {
  const data = enrichWilayas();
  return {
    totalWilayas: data.length,
    totalHotels: data.reduce((s, w) => s + w.hotels, 0),
    totalSites: data.reduce((s, w) => s + w.sites, 0),
    avgScore: Math.round(data.reduce((s, w) => s + w.score, 0) / data.length),
    topWilaya: data.sort((a, b) => b.score - a.score)[0],
    mostHotels: [...data].sort((a, b) => b.hotels - a.hotels)[0],
    highestRating: [...data].sort((a, b) => b.rating - a.rating)[0],
    mostSites: [...data].sort((a, b) => b.sites - a.sites)[0],
  };
}

export function getMonthlyTourists() {
  const base = [280, 310, 420, 580, 720, 890, 1050, 980, 760, 540, 380, 310];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months.map((month, i) => ({ month, tourists: base[i] * 1000 }));
}

export function getRegionDistribution() {
  const data = enrichWilayas();
  const regions = {};
  data.forEach(w => {
    regions[w.region] = (regions[w.region] || 0) + 1;
  });
  return Object.entries(regions).map(([name, value]) => ({ name, value }));
}

export function getHotelDistribution() {
  const data = enrichWilayas();
  return data
    .sort((a, b) => b.hotels - a.hotels)
    .slice(0, 8)
    .map(w => ({ name: w.name, hotels: w.hotels, score: w.score }));
}

export function getAllWilayas() {
  return enrichWilayas();
}
