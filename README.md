# 🌍 Air Quality GIS Dashboard

> **An interactive Web GIS platform for real-time monitoring and visualization of air quality indices (AQI).**

![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-Fast_Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-Mapping-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

## 📖 Overview

This project is a geospatial dashboard designed to visualize environmental data collected from various monitoring stations. It combines powerful mapping capabilities with data analytics to provide users with actionable insights regarding air quality levels (PM10, PM2.5, NO2, etc.).

Unlike static maps, this application features a **dynamic interface** where users can interact with stations to view detailed historical data and real-time metrics through integrated charts.

---

## ✨ Key Features

* **🗺️ Interactive Map Interface:** Built with **Leaflet**, allowing users to explore monitoring stations geographically.
* **📊 Data Visualization:** Integrated **Chart.js** (Bar, Line, Doughnut) to visualize pollutant trends over time.
* **⚡ High Performance:** Powered by **Vite** for lightning-fast bundling and HMR (Hot Module Replacement).
* **🪝 Custom Hooks Architecture:** Data fetching and logic are abstracted into reusable hooks (`useAirQualityData`, `useStationMetrics`) for cleaner components.

---

## 📂 Project Structure

The project follows a modular component-based architecture:

```bash
src/
├── components/
│   ├── charts/             # Reusable Chart Components (Bar, Line, Doughnut) 📊
│   ├── AirQualityMap.jsx   # Core Mapping Component (Leaflet Integration) 🌍
│   └── Header.jsx          # UI Layout
├── hooks/
│   ├── useAirQualityData.jsx  # API Integration & State Management ⚡
│   └── useStationMetrics.jsx  # Data Processing Logic
└── App.jsx                 # Main Application Layout
```

## Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/muzafferbulut/air-quality-management-portal.git
cd air-quality-management-portal

# 2. Install Dependencies
npm install

# 3. Start Development Server
npm run dev
# The app will be available at http://localhost:5173/ (usually)
```

<img src="/refactor.png" width="auto">

## 🛠️ Tech Stack details

  * Frontend Library: React 18
  * Build Tool: Vite
  * Mapping Engine: React Leaflet / Leaflet
  * Charting: Chart.js / React-Chartjs-2
  * HTTP Client: Axios (implied)

