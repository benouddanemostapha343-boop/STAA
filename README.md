# STAA — Smart Tourism & Territorial Analytics Algeria

A professional GIS-powered tourism intelligence platform built with React, Leaflet, and AI analytics.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
STAA/
├── public/
│   └── data/
│       └── algeria_wilayas.geojson   ← Replace with your QGIS export
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AlgeriaMap.jsx            ← Leaflet map component
│   │   ├── Sidebar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── WilayaCard.jsx
│   │   ├── InsightCard.jsx
│   │   ├── ChartPanel.jsx
│   │   ├── TourismPopup.jsx
│   │   ├── AIRecommendation.jsx
│   │   └── Loader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MapExplorer.jsx
│   │   ├── TourismAnalysis.jsx
│   │   ├── AIPlanner.jsx
│   │   ├── CompareWilayas.jsx
│   │   ├── Reports.jsx
│   │   └── About.jsx
│   ├── services/
│   │   ├── geoService.js
│   │   ├── analyticsService.js
│   │   └── aiService.js
│   └── data/
│       └── tourism.json
```

## 🗺️ QGIS Integration

Export your wilaya layer from QGIS as GeoJSON and place it in `public/data/algeria_wilayas.geojson`.

Required properties per feature:
```json
{
  "name": "Alger",
  "Hotels": 312,
  "sites": 420,
  "rating": 4.6,
  "accessibility": 95
}
```

## 📊 Tourism Score Formula

```
score = 0.4 × (sites/420 × 100)
      + 0.3 × (hotels/312 × 100)
      + 0.2 × (rating/5 × 100)
      + 0.1 × accessibility
```

## 🎨 Design System

- **Background:** `#07111d`
- **Green accent:** `#00c851`
- **Gold accent:** `#ffbb33`
- **Display font:** Playfair Display
- **Body font:** DM Sans
- Style: Luxury GIS Intelligence Dashboard with Glassmorphism

## 🔧 Tech Stack

- React 18 + Vite 5
- React Router v6
- Leaflet + React-Leaflet
- Framer Motion
- TailwindCSS
- Recharts
- PapaParse
- Axios
