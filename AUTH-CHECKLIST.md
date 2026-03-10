# ✅ GitHub Auth Setup Checklist

Copy these values as you go through the setup:

---

## 📝 STEP 1: GitHub OAuth App

**Page opened in browser:** https://github.com/settings/applications/new

Fill in the form:
```
Application name: VIPER Portal
Homepage URL: https://Tejakrishna-b.github.io/VIPER/
Authorization callback URL: https://Tejakrishna-b.github.io/VIPER/
```

After creating, save these values:

**Client ID:** _____________________________________

**Client Secret:** _____________________________________

---

## 📝 STEP 2: Cloudflare Worker

1. Go to: https://dash.cloudflare.com/sign-up (or login if you have account)
2. Click "Workers & Pages" → "Create application" → "Create Worker"
3. Name: `viper-auth`
4. Click "Deploy"
5. Click "Edit code"
6. Delete all code, copy from `cloudflare-worker.js` and paste
7. Update these 3 lines with values from Step 1:
   ```javascript
   const GITHUB_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   const GITHUB_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
   const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';
   ```
8. Click "Save and Deploy"

**Worker URL:** _____________________________________
(Should be like: https://viper-auth.YOURNAME.workers.dev)

---

## 📝 STEP 3: Update auth-config.js

Edit: `/Users/tejakrishna.b/Desktop/VIPER/auth-config.js`

Line 6 - Update:
```javascript
clientId: 'YOUR_CLIENT_ID_FROM_STEP_1',
```

Line 63 - Update:
```javascript
const response = await fetch('YOUR_WORKER_URL_FROM_STEP_2/auth/github', {
```

Save file, then run in Terminal:
```bash
cd /Users/tejakrishna.b/Desktop/VIPER
git add auth-config.js
git commit -m "Add OAuth credentials"
git push origin main
```

---

## 📝 STEP 4: Enable GitHub Pages (if not done)

1. Go to: https://github.com/Tejakrishna-b/VIPER/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Click Save
6. Wait 2-3 minutes

---

## 🎉 STEP 5: Test!

Visit: https://Tejakrishna-b.github.io/VIPER/

You should:
1. See "Authenticating..." screen
2. Get redirected to GitHub
3. Click "Authorize"
4. Get redirected back to portal
5. See the portal content! ✅

---

## 🔒 Access Control

Currently configured for:
✅ @vertexinc.com emails
✅ @vertex.com emails
✅ Username: Tejakrishna-b

Anyone with these credentials can access after GitHub authentication.

---

**Need detailed help? Check:** [QUICK-AUTH-SETUP.md](QUICK-AUTH-SETUP.md)
