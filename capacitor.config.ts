import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nwsa.tt1prep",
  appName: "TT1 Prep",
  // webDir is required by Capacitor but the app loads from server.url at runtime.
  // The public/ folder already contains the manifest, icons, and service worker.
  webDir: "public",
  server: {
    // ⚠️  REQUIRED: Replace the URL below with your deployed Next.js URL
    // (e.g. "https://your-app.vercel.app") before running `npx cap add ios/android`.
    // See CAPACITOR_SETUP.md Step 2 for instructions.
    url: "REPLACE_WITH_YOUR_DEPLOYED_URL",
    cleartext: false,
  },
  ios: {
    // Respects the safe-area (notch / Dynamic Island / home indicator)
    contentInset: "automatic",
  },
  android: {
    backgroundColor: "#ffffff",
  },
};

export default config;
