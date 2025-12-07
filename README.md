# DermAI Coach

A privacy-focused, AI-powered skin health tracking application built with React, Tailwind CSS, and Google Gemini 3 Pro.

## 🚀 Deployment Guide (Vercel)

1.  **Push to GitHub**: Ensure this code is pushed to a GitHub repository.
2.  **Import in Vercel**:
    *   Go to [Vercel](https://vercel.com).
    *   Click "Add New..." -> "Project".
    *   Select your GitHub repository.
3.  **Configure Environment Variables** (Critical Step):
    *   In the "Configure Project" screen (or later in Settings), look for **Environment Variables**.
    *   Add the following:
        *   **Key**: `API_KEY`
        *   **Value**: `[Your Google Gemini API Key]`
4.  **Deploy**: Click "Deploy".

## 🛠 Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file in the root directory:
    ```
    API_KEY=your_google_api_key_here
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```

## ⚠️ Medical Disclaimer
DermAI Coach is a wellness tracking tool, **NOT** a diagnostic medical device. Users are explicitly warned to consult professional dermatologists for diagnosis and treatment.
