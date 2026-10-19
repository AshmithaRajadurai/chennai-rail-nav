# Chennai RailNav 🚆

> An indoor facility & accessibility navigation system for major Chennai railway stations.

Chennai RailNav is a full-stack MERN application designed to help passengers, elderly travelers, and passengers with reduced mobility (*Divyangjan*) navigate complex, multi-level railway junction layouts with ease. It provides interactive station floorplans, step-free wheelchair routing, multi-language support (English, Tamil, and Hindi), and turn-by-turn voice assistance.

---

## 🌟 Key Features

- **🗺️ Interactive Station Layouts**
  - Scaled 2D SVG maps displaying platforms, tracks, concourses, foot overbridges (FOBs), ticket counters, waiting halls, and restrooms.
  - Interactive "Click on Map" selection mode to set departure and destination points visually.

- **♿ Accessible & Step-Free Routing**
  - Pathfinding powered by a custom weighted **Dijkstra's Algorithm**.
  - **Wheelchair Accessibility Mode**: Automatically avoids staircases and routes users via elevators, ramps, and escalators.

- **🌐 Multilingual Support (3 Languages)**
  - Seamless toggle between **English**, **தமிழ் (Tamil)**, and **हिन्दी (Hindi)**.
  - All station landmarks, platform announcements, and turn-by-turn directions are fully localized.

- **🎙️ Voice Guidance & Audio Assist**
  - Integrated text-to-speech assistant providing real-time spoken directions step-by-step.

- **👁️ Assistive Display Modes**
  - High-contrast color palette and large-text toggles designed for low-vision commuters.

- **📱 Mobile-First Responsive Design**
  - Optimized for smartphone screens with touch controls and a one-tap switcher between map view and route instructions.

---

## 🚉 Supported Stations

| Station Code | Station Name | Platforms & Highlights |
| :---: | :--- | :--- |
| **MAS** | Puratchi Thalaivar Dr. M.G. Ramachandran Central (Chennai Central) | Platforms 1–12, Suburban Terminals, Central FOB, Heritage Portico |
| **MS** | Chennai Egmore | Main Entrance, Platforms 1–11, Footbridges & Lifts |
| **TBM** | Tambaram | East & West Concourse, Suburban Lines, Connecting FOBs |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Graph & Navigation**: Graph data model (`Node`, `Edge`, `Station`) with weighted Dijkstra pathfinding

### Deployment
- **Platform**: Render (Web Service) / Vercel (Frontend SPA)

---

## 📂 Project Structure

```text
chennai-rail-nav/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets, SVG icons, favicon
│   ├── src/
│   │   ├── components/         # StationMap, NavigationControls, DirectionsList, VoiceGuide, Header
│   │   ├── services/           # Axios API configuration
│   │   ├── utils/              # Translations (en, ta, hi), landmark mappings
│   │   ├── App.jsx             # Main application state & layout
│   │   └── main.jsx            # React root
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node/Express API
│   ├── config/                 # MongoDB database connection
│   ├── controllers/            # Route, station, and facility controllers
│   ├── models/                 # Mongoose schemas (Station, Node, Edge)
│   ├── routes/                 # Express API routes (/api/stations, /api/routes)
│   ├── utils/                  # Dijkstra's shortest path algorithm
│   ├── seed.js                 # Database seeder with accurate station topology
│   ├── server.js               # Express server entry point & SPA fallback
│   └── package.json
├── package.json                # Workspace orchestrator scripts
└── render.yaml                 # Render cloud deployment blueprint
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or free MongoDB Atlas URI)

### 1. Clone the Repository

```bash
git clone https://github.com/AshmithaRajadurai/chennai-rail-nav.git
cd chennai-rail-nav
```

### 2. Install Dependencies

You can install all dependencies from the root directory:

```bash
npm run build
```

Or install separately:

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/railnav?retryWrites=true&w=majority
NODE_ENV=development
```

### 4. Seed the Database

Populate MongoDB with station nodes, walking edges, platforms, and accessible routes:

```bash
npm --prefix server run seed
```

### 5. Run the Application

In separate terminal windows (or tabs):

```bash
# Start backend server (runs on http://localhost:5000)
npm run server:dev

# Start frontend client (runs on http://localhost:5173)
npm run client:dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Overview

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Healthcheck endpoint |
| `GET` | `/api/stations` | Retrieve all available railway stations |
| `GET` | `/api/stations/:id` | Get details, nodes, and edges for a specific station |
| `POST` | `/api/routes/calculate` | Calculate optimal route (`startNodeId`, `endNodeId`, `requireAccessible`) |

---

## 👥 Accessibility Compliance

- **Wheelchair friendly**: Ramps and elevators are weighted preferentially; stair edges are excluded when accessibility mode is enabled.
- **Auditory assist**: Step-by-step synthesized voice announcements.
- **Visual assist**: High-contrast theme adhering to WCAG contrast guidelines and variable text sizing.

---

## 📄 License

This project was built for academic & practical development purposes. Feel free to use and adapt it for learning and public transit accessibility initiatives.
