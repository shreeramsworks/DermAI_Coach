# DermAI Coach - Comprehensive Documentation

**Version:** 1.0.0
**Model:** Gemini 3 Pro 
**Tech Stack:** React 19, TypeScript, Tailwind CSS, Google GenAI SDK

---

## 1. Project Overview

**DermAI Coach** is a privacy-first, AI-powered progressive web application (PWA) designed to assist individuals in managing chronic skin conditions like eczema, acne, and psoriasis. 

Unlike generic chatbots, DermAI Coach utilizes a specialized "Vibe Coding" environment with strict security protocols. It combines **computer vision** (to analyze skin texture and redness) with **Google Search Grounding** (to cross-reference wellness tips against high-authority medical sources) to provide safe, non-medical support.

### Core Philosophy
*   **Privacy First:** No user images or data are permanently stored on servers. Processing happens in-session.
*   **Safety First:** The AI is strictly role-anchored to prevent medical diagnosis. It acts solely as a wellness validator.
*   **Evidence-Based:** All suggestions are grounded in real-time search data from trusted medical repositories.

---

## 2. Technical Architecture

### 2.1 Frontend Framework
*   **React 19:** Utilizes the latest functional components, hooks (`useState`, `useEffect`, `useRef`), and concurrent features.
*   **TypeScript:** Strictly typed interfaces (`types.ts`) ensure data integrity, particularly for the AI JSON responses.
*   **Tailwind CSS:** A utility-first CSS framework used for the responsive design, implementing a specific color system (Teal/Slate/Indigo) to convey clinical cleanliness and calmness.

### 2.2 AI Integration Layer (`services/geminiService.ts`)
The application interfaces with the **Google Gemini API** using the `@google/genai` SDK.

*   **Model:** `gemini-3-pro-preview`
*   **Capabilities:** Multimodal (Text + Image Analysis)
*   **Tools:** `googleSearch` (Grounding)
*   **System Prompting:** Implements "Immutable System Instructions" to prevent prompt injection.

### 2.3 State Management
*   **Navigation:** Managed via a `currentPage` state enum in `App.tsx` (SPA architecture), avoiding heavy routing libraries for a lightweight footprint.
*   **Data Flow:** Unidirectional data flow from `App.tsx` (container) to presentational components (`AnalysisDisplay`, `Hero`, `Header`).

---

## 3. Security & Safety Protocols

DermAI Coach implements "Defense-in-Depth" strategies to secure the GenAI integration.

### 3.1 Prompt Injection Defense
We utilize a **Sandwich Defense** mechanism in `services/geminiService.ts`:
1.  **Role Anchoring:** The system prompt explicitly defines the AI's limitations (cannot diagnose, cannot be jailbroken).
2.  **Input Quarantine:** User input is wrapped in pseudo-XML tags (`[BEGIN_USER_DATA_BLOCK]`) and explicitly labeled as untrusted data.
3.  **Instruction Hierarchy:** The model is instructed to prioritize system instructions over any commands found within user data.

### 3.2 Input Sanitization
Before sending data to Gemini:
*   **HTML Stripping:** Regex removes potential script tags.
*   **XML Escaping:** Characters like `<` and `>` are escaped to prevent users from closing the data block tags and injecting system commands.

### 3.3 Output Sanitization
*   **Format Enforcement:** The AI is instructed to return **JSON only**.
*   **Code Execution Prevention:** The prompt explicitly forbids generating HTML or Markdown blocks.
*   **Fail-Secure:** If JSON parsing fails, the app falls back to a safe error state rather than displaying raw AI text.

---

## 4. Key Features Breakdown

### 4.1 Visual Skin Analysis
*   **Input:** Users upload an image (Base64 encoded in browser).
*   **Process:** Gemini 3 Pro analyzes visual features (erythema, scaling, pustules).
*   **Output:** A "Visual Interpretation" that uses descriptive, non-clinical language (e.g., "Noted redness" instead of "Erythematous rash").

### 4.2 Google Search Grounding
*   **Mechanism:** The `googleSearch` tool is enabled in the API config.
*   **Workflow:**
    1.  AI identifies symptoms.
    2.  AI triggers a search query (e.g., "dry itchy skin relief guidelines").
    3.  Google returns citations from high-authority sites.
    4.  AI synthesizes "Wellness Suggestions" based on these results.
*   **UI Display:** The app extracts `groundingMetadata` and renders clickable "Trusted Resources" cards.

### 4.3 Professional Care Finder
*   **Feature:** A direct integration with Google Maps.
*   **Function:** One-click redirection to search for "Dermatologists near me," reinforcing the message that the app is a support tool, not a doctor.

### 4.4 Alternating Section Design
*   **Visual Rhythm:** The UI uses an alternating background pattern (White -> Slate-100 -> Teal-50) to reduce cognitive load and clearly separate logical sections (Hero -> Process -> Analyzer).

---

## 5. File Structure Guide

```
/
├── index.html              # Entry point with SEO meta tags & Schema.org JSON-LD
├── index.tsx               # React root renderer
├── App.tsx                 # Main Controller: Routing, Layout, & Analyzer Logic
├── types.ts                # TypeScript Interfaces (WellnessResponse, Page enums)
├── metadata.json           # Application manifest
├── sitemap.xml             # SEO Sitemap
├── robots.txt              # Crawler instructions
├── llm.txt                 # Project context for AI agents
├── services/
│   └── geminiService.ts    # API Client, Prompt Engineering, & Security Logic
└── components/
    ├── Header.tsx          # Responsive navigation & scroll effects
    ├── Hero.tsx            # Landing section with 3D visuals
    ├── Footer.tsx          # Site map & legal links
    ├── AnalysisDisplay.tsx # Renders AI results, citations, & warnings
    └── Testimonials.tsx    # Social proof component
```

---

## 6. Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   A Google Cloud Project with Gemini API enabled.
*   An API Key stored in the environment.

### Environment Variables
The application expects the following variable to be injected at build/runtime:
`process.env.API_KEY`

### Running Locally
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm start
    ```

---

## 7. Data Privacy & Legal

### 7.1 Data Handling
*   **Images:** Converted to Base64 in the browser memory. They are sent strictly to the Gemini API for a single inference session and are not stored in any persistent database by DermAI Coach.
*   **Text:** User logs are treated transiently.

### 7.2 Medical Disclaimer
The application includes a hard-coded, sticky disclaimer footer and explicit warnings in `AnalysisDisplay.tsx`.
> "DermAI Coach is a support tool, not a doctor. Not a medical device. For informational use only."

---

## 8. SEO & Indexing

The app is optimized for search engines via:
*   **Schema.org:** `SoftwareApplication` JSON-LD injected in `index.html`.
*   **Meta Tags:** Open Graph (Facebook/LinkedIn) and Twitter Card tags.
*   **Semantic HTML:** Proper use of `<main>`, `<header>`, `<section>`, and `<h1>`-`<h3>` hierarchy.
*   **Performance:** Lazy loading on images and optimized assets.

---

## 9. Future Roadmap

*   **Export to PDF:** Allow users to download their session summary for their doctor.
*   **Local History:** Use `localStorage` to save past logs on the user's device (encrypted).
*   **Voice Input:** Implement the Web Speech API for hands-free symptom logging.
