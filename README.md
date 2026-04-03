
# Rivo Navigation

Rivo Navigation is a sensory-friendly web navigation experience designed for users who prefer comfortable, low-stimulation routes over simply the fastest path.

The project combines:
- Azure Maps visualization
- AI-assisted route understanding and comfort prediction
- Community reports for noise, crowding, and construction
- Firebase authentication (email/password + Google)
- A simple Node.js/Express backend for shared report storage

## Features

- Comfort-focused mapping UX with route and zone visualization
- Community reporting system:
	- Noise zones
	- Crowded areas
	- Construction zones
- AI NLP engine to parse natural language navigation intent
- Chatbot widget UI (Harbor assistant)
- Firebase auth modals (sign in, register, password reset, Google sign-in)
- Responsive frontend with dark mode support

## Tech Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Maps: Azure Maps Web SDK
- Backend: Node.js + Express + CORS
- Auth: Firebase Authentication

## Project Structure

```text
.
|-- index.html
|-- rivo.html
|-- ai-chatbot.html
|-- chatbot-widget.html
|-- server.js
|-- package.json
|-- assets/
|-- components/
|   |-- header.html
|   `-- footer.html
|-- css/
|   |-- style.css
|   `-- layout.css
`-- js/
    |-- script.js
    |-- ai-nlp-engine.js
    |-- ai-action-handler.js
    |-- chatbot-widget.js
    |-- firebase-config.js
    |-- auth.js
    |-- helpers.js
    `-- layout.js
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- Azure Maps subscription key
- Firebase project (for authentication)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Azure Maps key

In `js/script.js`, replace:

```js
subscriptionKey: 'YOUR_AZURE_MAPS_KEY'
```

with your real Azure Maps key.

### 3. Configure Firebase

In `js/firebase-config.js`, update `firebaseConfig` with your Firebase project values.

Important:
- Enable Email/Password and Google providers in Firebase Authentication
- Add your local domain (for example `localhost`) to authorized domains in Firebase Auth settings

### 4. Optional: Configure EmailJS

In `index.html`, replace EmailJS init placeholder:

```js
emailjs.init("your public id");
```

with your EmailJS public key if you use email workflows.

### 5. Run the app

```bash
npm start
```

Server starts at:

```text
http://localhost:3000
```

Open the URL above in your browser.

## API Endpoints

Base URL: `http://localhost:3000`

- `GET /api/reports`
	- Returns all community reports grouped by type.

- `POST /api/reports/noise`
	- Body example:
		```json
		{
			"coords": [77.4538, 28.6692],
			"level": "high",
			"description": "Loud traffic"
		}
		```

- `POST /api/reports/crowd`
	- Body example:
		```json
		{
			"coords": [77.4538, 28.6692],
			"density": "medium",
			"description": "Busy market"
		}
		```

- `POST /api/reports/construction`
	- Body example:
		```json
		{
			"coords": [77.4538, 28.6692],
			"description": "Road work in progress"
		}
		```

## Development Notes

- Reports are stored in-memory in `server.js`.
	- Data resets when the server restarts.
	- For production use, connect a database (MongoDB, PostgreSQL, Firebase, etc.).

- Frontend report functions gracefully fall back to local mode if backend is offline.

## Available Scripts

- `npm start` - Start the Express server
- `npm run dev` - Starts the same server command (currently same as `start`)

## Quick Manual Test

1. Start the server with `npm start`.
2. Open `http://localhost:3000`.
3. Submit a few community reports from the UI.
4. Confirm markers appear on the map and report count updates.
5. Reload the page to verify report fetch from `/api/reports`.



ISC (see `package.json
