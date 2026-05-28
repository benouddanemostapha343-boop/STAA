/**
 * geoService.js
 * Handles GeoJSON loading and spatial analysis for Algeria wilayas
 */

export async function loadAlgeriaGeoJSON() {
  try {
    const res = await fetch('/data/algeria_wilayas.geojson');
    if (!res.ok) throw new Error('GeoJSON not found');
    return await res.json();
  } catch {
    // Return a minimal fallback if the file doesn't exist yet
    return null;
  }
}

export function calcTourismScore(wilaya) {
  const { sites = 0, hotels = 0, rating = 0, accessibility = 0 } = wilaya;
  const normalizedSites = Math.min(sites / 420, 1) * 100;
  const normalizedHotels = Math.min(hotels / 312, 1) * 100;
  const normalizedRating = (rating / 5) * 100;
  const score =
    0.4 * normalizedSites +
    0.3 * normalizedHotels +
    0.2 * normalizedRating +
    0.1 * accessibility;
  return Math.round(score * 10) / 10;
}

export function getScoreColor(score) {
  if (score >= 80) return '#00c851';
  if (score >= 65) return '#ffbb33';
  if (score >= 50) return '#ff8800';
  return '#ff4444';
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Moderate';
  return 'Developing';
}

export function getOpportunityColor(score) {
  if (score >= 70) return '#00c851';
  if (score >= 50) return '#ffbb33';
  return '#ff4444';
}
