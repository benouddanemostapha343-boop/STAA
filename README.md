# STAA — Smart Tourism & Territorial Analytics Algeria

A React and Leaflet prototype for exploring tourism indicators in Algeria.

The map uses 69 OpenStreetMap-derived wilaya boundaries; the bundled tourism dataset has sample indicators for 20 wilayas. Areas without tourism sample data are shown without a score. Visitor trends are illustrative, itineraries use local templates, and recommendations are rule-based; these are not live statistics or an AI service. Replace the sample indicators with verified sources before using results for planning.

The trip planner supports 1–14 day durations, up to 20 travelers, and interest-based activity preferences. It accepts a total budget per traveler in DZD and uses the daily amount to choose an illustrative itinerary tier. Its ranges are planning heuristics, not verified prices or quotations; matching activities and destinations come from bundled templates.

## 🚀 Quick Start

```bash
# Install dependencies (Node.js and npm required)
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
│       ├── ATTRIBUTION.md
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

Export your wilaya layer from QGIS as GeoJSON and replace `public/data/algeria_wilayas.geojson`. The bundled file contains actual OSM-derived boundaries, with attribution and licensing information in `public/data/ATTRIBUTION.md`.

Feature names should match the names in `src/data/tourism.json`. Optional tourism properties can be supplied as:
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
