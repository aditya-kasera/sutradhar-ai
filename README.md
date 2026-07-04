# Sutradhar AI 
> **Every Place Has A Story.**

Sutradhar AI (named after the *Sutradhar*—the traditional storyteller and thread-weaver in classical Indian theater) is an immersive, high-fidelity AI Cultural Companion. It reframes conventional tourism into a mindful, deeply informed journey by revealing the intangible heritage, folklore, culinary philosophies, and seasonal local rhythms of any destination on Earth.

---

## 🗺️ Problem Statement
Modern travel has been commodified into superficial checklist tourism. Social media algorithms feed homogeneous, crowded "must-see" spots and cookie-cutter checklists, completely isolating the traveler from the living tissue of a destination—its local legends, sacred geometry, generational kitchens, and community customs. Travelers visit places but miss their stories, leading to cultural disconnect, tourist friction, and a missed opportunity for true mental and spiritual enrichment.

## 🏮 Our Solution
Sutradhar AI acts as a digital storyteller. By pairing advanced generative models with strict structured JSON contracts, it dynamically weaves beautiful, customized cultural profiles tailored to any hamlet, town, or city. It moves away from standard listicles and generic tourist guides to provide multi-layered narrative boards, deep regional sub-modules, and localized perspectives that guide travelers to visit with reverence, deep context, and genuine curiosity.

✅ The Application was built and validated in Google AI Studio and the repository contains the full implementation.

---

## ✨ Key Features
* **Flexible Geography**: Choose from highly curated historical coordinates (such as Kyoto, Varanasi, Cuzco, Lisbon) or input any off-grid coordinates, local district, or country.
* **Curated Perspectives Grid**: Explores deep historical, folklore, and sensory layers instead of standardized commercial lists.
* **Interactive Perspective Switching**: Allows travelers to explore a single destination through five distinct viewpoints (Historian, Resident, Chef, Artist, and Photographer).
* **Dynamic Geolocation Links**: Instantly generates clean, precise Google Maps routing targets for all featured locations.
* **High-Fidelity Physical Archiving**: Features a tailor-made print stylesheet (`@media print`) that reformats the dark, interactive dashboard into a stunning, high-contrast, black-and-white physical travel booklet for offline, screen-free exploration.

---

## 🧠 AI Features
* **Cultural Thesis**: Generates an intellectually honest, emotionally resonant, and poetic central thesis of a place's spirit instead of generic Wikipedia text.
* **Personalized Traveler Archetypes**: Analyzes travel style, group size, and interests to match travelers with custom-tailored archetypes (e.g., *Mindful Explorer*, *Culinary Initiate*, *Time Traveler*) complete with dynamic reasoning.
* **Cultural Lens**: Contextualizes the destination through simulated diaries of five distinct local archetypes.
* **Hidden Gems**: Maps lesser-known nodes with detailed local suggestions, contextual vibes, and instructions for respectful visiting.
* **Heritage**: Highlights UNESCO sites, historical monuments, and intangible traditions, explaining their philosophical or structural importance.
* **Local Rhythms**: Explores date-neutral seasonal patterns (such as solar solstices, harvest cycles, monastic periods) with clear guidelines on how to verify exact schedules with hosts.
* **Taste the Culture**: Unlocks regional culinary philosophies, sacred eating customs, and traditional dishes with historical origins.
* **Respect Before You Go**: Outlines necessary, localized behavioral "Dos and Don'ts" accompanied by their underlying cultural rationales.
* **Local Lexicon**: Standardizes essential words and localized phrases accompanied by easy-to-use phonetic pronunciation keys.

---

## 🏛️ Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                   │
│         React 19 + Tailwind CSS 4 + Motion             │
└───────────────────────────┬────────────────────────────┘
                            │ (Form Inputs / User Archetype)
                            ▼
┌────────────────────────────────────────────────────────┐
│                    VALIDATION LAYER                    │
│        Client & Server State-Verification Engine       │
└───────────────────────────┬────────────────────────────┘
                            │ (Validated payload)
                            ▼
┌────────────────────────────────────────────────────────┐
│                     PROMPT FACTORY                     │
│    Dynamic Context Compiler & Parameter Injector       │
└───────────────────────────┬────────────────────────────┘
                            │ (Structured Context)
                            ▼
┌────────────────────────────────────────────────────────┐
│                   GEMINI AI ENGINE                     │
│               Gemini 2.5 Flash Model                   │
└───────────────────────────┬────────────────────────────┘
                            │ (Rigid JSON stream)
                            ▼
┌────────────────────────────────────────────────────────┐
│                     JSON CONTRACT                      │
│     Typed Schema Enforcement via @google/genai         │
└───────────────────────────┬────────────────────────────┘
                            │ (Validated SutradharSchema)
                            ▼
┌────────────────────────────────────────────────────────┐
│                  EXPERIENCE RENDERER                   │
│        Interactive Narrative Canvas & Print CSS        │
└────────────────────────────────────────────────────────┘
```

* **Presentation Layer**: Built on React 19, utilizing a responsive, eye-friendly layout with fluid typography and micro-animations via `motion`.
* **Validation Layer**: Runs real-time interface validation, ensuring user selections and destination search terms are properly sanitized before dispatching requests.
* **Prompt Factory**: Compiles complex system directives, preventing prompt injection, and binding the response style to historical accuracy, poetic delivery, and deep human insight.
* **Gemini AI**: Uses the powerful **Gemini 2.5 Flash** model to perform incredibly rapid, multi-faceted cultural indexing under a sub-5 second response time.
* **JSON Contract**: Leverages the official modern `@google/genai` SDK to implement a rigid, error-free schema contract (`Type.OBJECT`), completely neutralizing JSON formatting anomalies.
* **Experience Renderer**: Decouples the structured payload to construct beautiful cards, localized maps, custom interactive tabs, and beautiful offline print outputs.

---

## 💻 Tech Stack
* **Framework**: React 19, Vite 6
* **Styles & Animations**: Tailwind CSS v4, Motion (Framer Motion)
* **Icons**: Lucide React
* **Server**: Express (Node.js with ES Modules)
* **AI Integration**: `@google/genai` SDK (v2.4.0)
* **Language**: TypeScript

---

## 🔒 Security Considerations
* **Zero Client-Side Secret Exposure**: All interactions with the Gemini API are handled exclusively by the server backend. Client credentials and secrets are never exposed to the browser.
* **Input Sanitization**: High-security server parameters and regex validations neutralize malicious scripts or prompt injection payloads.
* **Secure Referrers**: Outbound anchor tags implement strict security headers (`rel="noopener noreferrer"`).

---

## ♿ Accessibility (A11y)
* **Comprehensive ARIA Markup**: Seamless semantic navigation featuring explicit `role="tablist"`, `role="tab"`, and `role="radiogroup"` implementations.
* **Keyboard Friendly**: Integrated focus highlights (`focus:ring-2 focus:ring-amber-500/50`), accessible outlines, and intuitive key listeners (e.g., `Escape` binds to dropdown dismissals).
* **High Contrast**: Meets WCAG Double-A standards, balancing radiant glowing amber highlights against deep, light-controlled slate backgrounds.

---

## 📂 Project Structure
```
├── server.ts                  # Express backend & Gemini Schema compiler
├── package.json               # Bundling configurations, scripts, and dependencies
├── metadata.json              # Platform manifest and workspace permissions
├── src/
│   ├── main.tsx               # Client bootstrap entry point
│   ├── App.tsx                # Client shell, header, and route views
│   ├── types.ts               # Shared interfaces & SutradharSchema contract
│   ├── data.ts                # Registry data module & constraints
│   ├── index.css              # Global styles, fonts, and print layouts
│   └── components/
│       ├── IntakeForm.tsx     # Debounced search & accessible travel planner
│       └── ModuleRenderer.tsx # Contextual board, tabs, and interactive maps
```

---

## 🚀 Setup Instructions

### Prerequisites
* Node.js (v18 or higher)
* NPM

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000`.

---

## 📦 Production Deployment

### Build Application
Compile both static client assets and server bundle:
```bash
npm run build
```
This produces a compiled static build in `/dist` and a single compiled Node CommonJS bundle in `dist/server.cjs` via `esbuild`.

### Start Production Server
```bash
npm start
```

---

## 🔮 Future Improvements
* **Audio Storytelling Integration**: Implement server-side Text-to-Speech via Gemini Live API to listen to cultural narratives like an audio guide.
* **Offline PWA Syncing**: Enable complete offline service worker support to save compiled destination narratives locally before getting on a plane.
* **Community Contributions**: Create a decentralized layer where locals can verify, augment, or expand on generated hidden gems.

---

## 📄 License
This project is open-source and licensed under the MIT License.
