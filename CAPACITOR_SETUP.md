# Capacitor Setup — Publishing to Apple App Store & Google Play

This app is configured with [Capacitor](https://capacitorjs.com/) to wrap the deployed
Next.js web app in a native iOS/Android shell that can be submitted to both marketplaces.

> **How it works:** The native app opens a WebView that loads your deployed Next.js URL.
> All server-side features (API routes, auth, database) continue to run on your hosting
> provider (e.g. Vercel, Railway). Only the native shell lives in the app stores.

---

## Prerequisites

| Tool | Required for |
|------|--------------|
| [Node.js](https://nodejs.org/) ≥ 18 | All steps |
| [Xcode](https://developer.apple.com/xcode/) 15+ | iOS build |
| [Android Studio](https://developer.android.com/studio) | Android build |
| Apple Developer account ($99/yr) | iOS App Store submission |
| Google Play Console account ($25 one-time) | Google Play submission |

---

## Step 1 — Deploy your Next.js app

Deploy the Next.js app to a public HTTPS URL first. Recommended options:

- **Vercel** (easiest): `vercel deploy`
- **Railway**: connect the repo and deploy
- **Render**, **Fly.io**, etc.

Make sure your database (PostgreSQL via Prisma) and `NEXTAUTH_URL`/`NEXTAUTH_SECRET`
environment variables are set on the hosting provider.

---

## Step 2 — Update the server URL in `capacitor.config.ts`

Open `capacitor.config.ts` and replace the placeholder with your deployed URL:

```typescript
server: {
  url: "https://your-actual-app.vercel.app",
  cleartext: false,
},
```

---

## Step 3 — Add iOS and Android platforms

Run the following commands **once** to generate the native project folders:

```bash
npx cap add ios
npx cap add android
```

This creates `ios/` and `android/` directories in the repo.

> **Tip:** Add `ios/` and `android/` to `.gitignore` if you do not want to commit the
> generated native projects. Many teams commit them for reproducible CI builds.

---

## Step 4 — Sync web assets and config

Whenever you update `capacitor.config.ts` run:

```bash
npm run cap:sync
# equivalent to: npx cap sync
```

---

## Step 5 — Open in the native IDE

```bash
npm run cap:open:ios      # Opens ios/ in Xcode
npm run cap:open:android  # Opens android/ in Android Studio
```

---

## Step 6 — iOS: Configure app identity in Xcode

1. In Xcode, select the `App` target → **Signing & Capabilities**.
2. Set **Bundle Identifier** to `com.nwsa.tt1prep` (or your preferred ID).
3. Select your Apple Developer **Team**.
4. Add capabilities as needed (Push Notifications, etc.).
5. Update the app icon: replace `ios/App/App/Assets.xcassets/AppIcon.appiconset/`.

---

## Step 7 — Android: Configure app identity in Android Studio

1. In Android Studio, open `android/app/build.gradle`.
2. Verify `applicationId "com.nwsa.tt1prep"`.
3. Update `versionCode` and `versionName` for each release.
4. Update the app icon: replace drawables in
   `android/app/src/main/res/mipmap-*/ic_launcher*`.

---

## Step 8 — Build release binaries

### iOS (`.ipa`)

1. In Xcode: **Product → Archive**.
2. In the Organizer: **Distribute App → App Store Connect → Upload**.

### Android (`.aab`)

1. In Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.
2. Sign with your keystore.
3. Upload the `.aab` to Google Play Console.

---

## App Store metadata checklist

- [ ] App name: **TT1 Prep** (or **NWSA TT1 Exam Prep**)
- [ ] Category: **Education**
- [ ] Short description (Google Play, max 80 chars)
- [ ] Full description
- [ ] Screenshots: phone + tablet sizes for both platforms
- [ ] Privacy Policy URL (required by both stores)
- [ ] App icons: 1024×1024 PNG (iOS), 512×512 PNG (Google Play)

---

## Updating the app after code changes

Because the WebView loads a live URL, **users always get the latest version automatically**
when you deploy to your hosting provider — no new app store submission required.

Only submit a new binary to the stores when you need to:
- Change native capabilities (push notifications, camera access, etc.)
- Update the `server.url` in `capacitor.config.ts`
- Bump the version shown in the stores

---

## Existing PWA support

The app also ships as a full **Progressive Web App** (Option A):
- `public/manifest.json` — installable on home screen
- `public/sw.js` — offline caching via service worker
- `src/components/PWARegister.tsx` — registers the service worker

Users who find the web app can install it directly from their browser without going
through an app store.
