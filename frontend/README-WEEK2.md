# iTrust — Week 2 React Native frontend kit

**Purpose:** Apply the sponsor's navy / gold design to the Expo `blank-typescript` app that already exists in `~/Projects/iTrust-Social-App-/frontend`.

These source files do NOT replace your package.json, package-lock.json, tsconfig.json or app.json. Existing project files are preserved except the listed replacements.

## Install packages (from existing frontend directory)

```bash
npx expo install @expo/vector-icons react-native-screens react-native-safe-area-context expo-secure-store react-native-url-polyfill
npm install @react-navigation/native @react-navigation/bottom-tabs @supabase/supabase-js
```

## Apply kit (from the extracted kit directory)

```bash
cp App.tsx theme.ts "$HOME/Projects/iTrust-Social-App-/frontend/"
cp -R components lib navigation screens assets "$HOME/Projects/iTrust-Social-App-/frontend/"
```

## Optional Supabase setup

Use the team's Supabase project URL and PUBLISHABLE key. Put them in `frontend/.env` and keep that file ignored. Supabase secret keys are server-only. Do not copy `.env.example` placeholders as actual credentials; absent values keep the app in UI preview mode.

## Test

```bash
cd ~/Projects/iTrust-Social-App-/frontend
npx tsc --noEmit
npx expo start --clear
```

- Login / signup: validate email, password length, password confirmation
- Open UI Preview to see mock Home, Discover, Create, Inbox, Profile tabs
- Home: sample post with locally toggled like
- Discover: local search and interest selection
- Create: draft + preview (not published)
- Inbox: placeholder only
- Profile: Who I Am switch, sample Trust Score, Exit UI Preview
- If real Supabase keys configured: create account, confirm email if required, login, app session restore, logout

## What is not implemented

No real profiles, trust scores, holographic avatar, NFC, ping, connected feed, content publishing, private messaging, row-level security, or backend database integration. Values and content shown in the tabs are sample/demonstration content only. Those depend on the team backend and later sprints.

## Before pushing to GitHub

Ensure `frontend/.gitignore` has `.env`, `.env.*`, `!.env.example`, `.expo/`, `node_modules/`.

```bash
cd ~/Projects/iTrust-Social-App-
git branch --show-current
git status
git add frontend/
git diff --cached --name-only
# Verify no .env, node_modules or .expo are staged
git commit -m "feat(frontend): add sponsor-inspired Week 2 UI foundation"
git push -u origin feat/week2-frontend
```
