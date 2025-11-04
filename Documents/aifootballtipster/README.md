# AI Football Tipster

**AI Football Tipster** is a sophisticated full-stack web application that leverages the power of Google's Gemini 2.5 Flash AI to provide expert, data-driven predictions for soccer matches. It features a secure backend powered by Netlify Functions and a Firebase Firestore database to calculate and display a global, daily accuracy metric.

---

## ✨ Key Features

-   **AI-Powered Predictions**: Get detailed probabilistic outcomes for Match Winner, Total Goals, and more.
-   **Secure Backend**: Netlify Functions handle all API calls, keeping your Gemini API key safe.
-   **Global Daily Accuracy**: A serverless function automatically calculates the AI's daily performance, providing a transparent accuracy metric to all users.
-   **Ephemeral Database**: Prediction data is stored for 24 hours, analyzed, and then deleted to maintain user privacy and stay within free-tier database limits.
-   **Up-to-Date Data**: Utilizes Google Search grounding to ensure analysis is based on the latest team news, player form, and stats.
-   **Live Scores Sidebar**: Stay updated with real-time soccer scores from around the world.
-   **Intuitive UI**: A modern, responsive design using React and Tailwind CSS.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **Backend**: Netlify Functions (Serverless Node.js)
-   **Database**: Google Firebase Firestore
-   **AI & Data**:
    -   **Google Gemini API (`gemini-2.5-flash`)**: For generating match analysis and predictions.
    -   **TheSportsDB API**: For fetching live soccer scores.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally for development and testing.

### Prerequisites

You will need accounts and API keys for the following services:

1.  **Google Gemini API**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Google Firebase**: Create a new project at the [Firebase Console](https://console.firebase.google.com/).
3.  **TheSportsDB API**: A paid Patreon subscription is required for the live scores endpoint. Get your key from [TheSportsDB on Patreon](https://www.patreon.com/TheSportsDB).
4.  **Netlify Account**: Sign up for a free account at [Netlify](https://www.netlify.com/).

### Environment Setup for Local Development

This project uses Netlify Functions for its backend. To run it locally, you need the Netlify CLI and a `.env` file to store your secret keys.

1.  **Install Netlify CLI & Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up `.env` file:**
    In the root of the project, create a new file named `.env`. **This file must not be committed to Git.** You need to fill in your secret keys in this file:

    ```env
    # --- Local Development Environment Variables ---
    # Replace placeholder values with your actual secret keys.

    # Your Google AI Studio API Key
    API_KEY="YOUR_GEMINI_API_KEY"

    # Your TheSportsDB API Key (from Patreon)
    THESPORTSDB_API_KEY="YOUR_THESPORTSDB_API_KEY"

    # --- Firebase Admin SDK Credentials ---
    # 1. Go to Firebase project settings > Service accounts > Generate new private key.
    # 2. Copy the entire contents of the downloaded JSON file.
    # 3. Paste the full JSON content here, enclosed in single quotes.
    FIREBASE_SERVICE_ACCOUNT_KEY='PASTE_YOUR_FIREBASE_SERVICE_ACCOUNT_JSON_HERE'

    # Your Firebase Project ID from the same settings page.
    FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
    ```

3.  **Run the development server with Netlify:**
    The `netlify dev` command will run your frontend and your serverless functions simultaneously, automatically loading the variables from your `.env` file.
    ```bash
    netlify dev
    ```
    Your application should now be running on `http://localhost:8888`.

---

## ☁️ Deployment on Netlify

This application is optimized for deployment on **Netlify**.

### Deployment Steps:

1.  Push your project code to a GitHub repository.
2.  Connect your GitHub repository to your Netlify account.
3.  **Configure Environment Variables in Netlify:**
    Go to your site's settings in Netlify, then to `Build & deploy > Environment`. Add the same environment variables you defined in your `.env` file:
    -   `API_KEY`
    -   `THESPORTSDB_API_KEY`
    -   `FIREBASE_SERVICE_ACCOUNT_KEY` (Paste the entire JSON content here)
    -   `FIREBASE_PROJECT_ID`
4.  Deploy the site. Netlify will automatically build the frontend and deploy your serverless functions from the `netlify/functions` directory.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.