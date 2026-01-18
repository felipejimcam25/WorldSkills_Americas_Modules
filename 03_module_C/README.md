# Mobile Web Services – Santiago, Chile (WorldSkills)

## 📱 Project Overview

This project is a **mobile-focused web application** developed as part of a **WorldSkills Americas (WSA) – Module C** challenge.

The goal is to provide **essential local services information for Santiago, Chile**, including:

- Parking availability  
- Events  
- Weather forecast  
- Pinned (fixed) items  
- User configuration  

The application consumes data from a **simulated API server built in PHP**, which is provided by the competition organizers.

> ⚠️ **Important note**  
> This project is designed and evaluated primarily for **functionality and logic on mobile devices**.  
> **Visual styles and UI design were not graded**, as long as usability and functional requirements were met.

---

## 🗂 Project Structure

/XX_module_C
│
├── index.html
├── manifest.json
├── css/
│ └── styles.css
├── js/
│ ├── app.js
│ ├── api.js
│ ├── parking.js
│ ├── events.js
│ ├── weather.js
│ └── settings.js
├── assets/
│ ├── icons/
│ └── svg/
└── README.md

markdown
Copy code

The simulated API server must be placed **outside the project folder**:

/ip-servidor/module_c_api.php

yaml
Copy code

---

## 🔌 API Server Setup

1. Locate the file:
ip-servidor/module_c_api_server.zip

csharp
Copy code
2. Extract the ZIP file.
3. You will obtain a single PHP file:
module_c_api.php

pgsql
Copy code
4. Place it in the following path:
ip-servidor/module_c_api.php

sql
Copy code

### ▶ Running the API Server (Required)

To run the simulated API server, you **must start a PHP built-in server explicitly on port 8000**.

From the directory where `module_c_api.php` is located, execute:

php -S localhost:8000

markdown
Copy code

⚠️ **Important:**
- The API **must run on port 8000**
- Using a different port may cause the application to fail when loading images or API data
- The project was tested and evaluated assuming this specific port

### Available API Endpoints

- `module_c_api.php/carparks.json`
- `module_c_api.php/events.json`
- `module_c_api.php/weather.json`

---

## 🧭 Application Navigation

The mobile app contains **five main navigation buttons**, always visible at the bottom of the screen:

1. **Parking** – Parking availability  
2. **Events** – Events list with pagination and filters  
3. **Weather** – 7-day weather forecast  
4. **Pinned** – Pinned events and parking spots  
5. **Settings** – Application configuration  

### Layout Rules

- Header: fixed at the top  
- Navigation bar: fixed at the bottom  
- Main content scrolls independently  
- In landscape mode, the navigation bar becomes a **hamburger menu**

---

## 🚗 Parking Availability

Displays a list of parking locations.

Each item shows:
- Parking name  
- Distance from current location  
- Available spaces  

### Features

- Search parking by name  
- Sort by:
  - Alphabetical order  
  - Distance (geolocation-based)  
  - Number of available spaces  
- Ascending / descending order  
- Pin / unpin parking locations  
- Pinned items are stored in **Local Storage** and restored on reload  

### Geolocation

- Default: browser geolocation  
- Manual simulation supported via URL:
?latitude=45.755051&longitude=4.846358

yaml
Copy code

---

## 📅 Events

Displays a **paginated list of events**.

Each event shows:
- Image  
- Title  
- Date  

### Event Filtering

Events can be filtered using:
- Start date  
- End date  

Example:
/module_c_api.php/events.json?beginning_date=YYYY-MM-DD&ending_date=YYYY-MM-DD

yaml
Copy code

### Infinite Scroll

- More events are loaded automatically when reaching the bottom
- Ensures:
  - No duplicate records  
  - No missing events  
  - Smooth loading behavior  

### Event Focus

- Clicking an event shows a detailed view
- Events can be pinned and restored from **Local Storage**

---

## 🌤 Weather

Displays a **7-day weather forecast**.

- Vertical layout in portrait mode  
- Horizontal scroll in landscape mode  

### SVG Icons

- SVG icons are selected based on weather status
- Stroke color: `#1c3e60`
- Stroke width: `1`
- No fill
- Animated stroke effect on hover

---

## 📌 Pinned Items

Displays all pinned:
- Parking locations  
- Events  

### Features

- Respects sorting and view configuration
- **“Clear pinned”** button removes all pinned items

---

## ⚙ Settings

The settings view allows the user to configure:

- **Theme**
  - Light
  - Dark
  - System default
- **List format**
  - List view
  - Card view
- **Global sorting**
  - Ascending
  - Descending
- **Parking-specific sorting method**

All settings are persisted using **Local Storage**.

---

## ♿ Accessibility

- Semantic HTML elements
- Proper contrast and labels
- Keyboard navigable
- Tested using **Chrome Lighthouse** for accessibility score

---

## 🧪 Testing Environment

- Browser: **Google Chrome**
- Platform: **Mobile-first (responsive)**

⚠️ If Node.js is used, avoid sharing `node_modules` between Windows and Linux environments.

---

## 🏁 Notes

- This project follows **WorldSkills Americas – Module C** requirements
- Focused on **logic, API integration, and mobile behavior**
- **UI styling was not part of the evaluation criteria**

---

## 👤 Author

Developed for **WorldSkills Americas 2025 – Module C** 