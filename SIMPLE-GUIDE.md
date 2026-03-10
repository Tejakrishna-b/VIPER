# 🎯 EXACTLY What to Change - Visual Guide

## Your Configuration (Already Set ✅)

```
Username: Tejakrishna-b
Company Email: @vertexinc.com
Portal URL: https://Tejakrishna-b.github.io/VIPER-main/
```

---

## Step-by-Step: What YOU Need to Do

### 📍 STEP 1: Get GitHub OAuth Credentials

Go to: https://github.com/settings/developers

Click "New OAuth App" and enter:
```
Application name: VIPER Portal Auth
Homepage URL: https://Tejakrishna-b.github.io/VIPER-main/
Callback URL: https://Tejakrishna-b.github.io/VIPER-main/
```

You'll get:
- ✅ **Client ID** (looks like: `Iv1.a629723000a7c9c5`)
- ✅ **Client Secret** (looks like: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t`)

**📝 Save these! You'll need them in the next steps.**

---

### 📍 STEP 2: Deploy Cloudflare Worker

1. Go to: https://workers.cloudflare.com/
2. Sign up (FREE account)
3. Create new Worker (name it anything, e.g., `viper-auth`)
4. Click "Quick Edit"
5. Paste the code from your `cloudflare-worker.js` file
6. **CHANGE THESE 2 LINES:**

```javascript
// LINE 5 - Paste your Client ID here:
const GITHUB_CLIENT_ID = 'Iv1.a629723000a7c9c5';  // ⬅️ YOUR CLIENT ID

// LINE 6 - Paste your Client Secret here:
const GITHUB_CLIENT_SECRET = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t';  // ⬅️ YOUR CLIENT SECRET
```

7. Click "Save and Deploy"
8. **📝 Copy your Worker URL** (e.g., `https://viper-auth.your-subdomain.workers.dev`)

---

### 📍 STEP 3: Update auth-config.js

Open `auth-config.js` and change 2 lines:

#### Change #1 - Line 7:
**BEFORE:**
```javascript
clientId: 'YOUR_GITHUB_CLIENT_ID',
```

**AFTER:**
```javascript
clientId: 'Iv1.a629723000a7c9c5',  // ⬅️ Paste YOUR Client ID here
```

#### Change #2 - Line 51:
**BEFORE:**
```javascript
const response = await fetch('https://YOUR_WORKER_URL.workers.dev/auth/github', {
```

**AFTER:**
```javascript
const response = await fetch('https://viper-auth.your-subdomain.workers.dev/auth/github', {
                           // ⬆️ Paste YOUR Worker URL here
```

Save the file!

---

### 📍 STEP 4: Push to GitHub

Open Terminal in the VIPER-main folder and run:

```bash
git add .
git commit -m "Configure Vertex authentication"
git push origin main
```

---

### 📍 STEP 5: Enable GitHub Pages

1. Go to: https://github.com/Tejakrishna-b/VIPER-main/settings/pages
2. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
3. Click **Save**
4. Wait 2 minutes

---

## ✅ Done! Test Your Portal

Visit: **https://Tejakrishna-b.github.io/VIPER-main/**

### What Should Happen:

1. **You see a loading screen** → Good! Redirecting to GitHub
2. **GitHub asks you to authorize** → Click "Authorize"
3. **Page loads with your portal** → Success! ✅
4. **You see your avatar in top-right** → Perfect!

### Who Can Access:

✅ **You** (Tejakrishna-b) - Always allowed
✅ **Anyone with @vertexinc.com email** - Allowed
✅ **Anyone with @vertex.com email** - Allowed
❌ **Everyone else** - "Access Denied" message

---

## 📋 Quick Summary - The 3 Values You Need:

| Item | Where to Get | Where to Use |
|------|-------------|--------------|
| **Client ID** | GitHub OAuth App | `auth-config.js` line 7<br>`cloudflare-worker.js` line 5 |
| **Client Secret** | GitHub OAuth App | `cloudflare-worker.js` line 6 |
| **Worker URL** | Cloudflare Dashboard | `auth-config.js` line 51 |

---

## 🚨 Important Notes

1. **Never commit Client Secret to GitHub!**
   - Only put it in Cloudflare Worker (which is separate from GitHub)
   - The `cloudflare-worker.js` file in your repo should have `YOUR_GITHUB_CLIENT_SECRET` placeholder

2. **Callback URL must match EXACTLY:**
   - GitHub OAuth App: `https://Tejakrishna-b.github.io/VIPER-main/`
   - auth-config.js: `https://Tejakrishna-b.github.io/VIPER-main/`
   - Must include trailing slash `/`

3. **Worker CORS origin (already set correctly):**
   - Cloudflare Worker: `https://Tejakrishna-b.github.io` (NO trailing slash)

---

## 🎯 Example with Fake Values

Here's what it looks like with example values:

### In auth-config.js:
```javascript
// Line 7
clientId: 'Iv1.a629723000a7c9c5',  // ⬅️ Your real Client ID

// Line 10 (already correct)
redirectUri: 'https://Tejakrishna-b.github.io/VIPER-main/',

// Line 13-15 (already correct)
allowedDomains: [
    '@vertexinc.com',
    '@vertex.com'
],

// Line 51
const response = await fetch('https://viper-auth.myname.workers.dev/auth/github', {
                           // ⬆️ Your real Worker URL
```

### In cloudflare-worker.js (deployed on Cloudflare, NOT in GitHub):
```javascript
// Lines 5-7
const GITHUB_CLIENT_ID = 'Iv1.a629723000a7c9c5';  // ⬅️ Your Client ID
const GITHUB_CLIENT_SECRET = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t';  // ⬅️ Your Client Secret
const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';  // ✅ Already correct
```

---

## 🔍 How to Find Line Numbers

**In VS Code:**
- Line numbers are shown on the left side
- Press `Cmd+G` (Mac) or `Ctrl+G` (Windows) and type the line number to jump to it

**In any text editor:**
- Open the file
- Use Find (Cmd+F or Ctrl+F)
- Search for the text you need to change

---

## ✅ Final Checklist

- [ ] Created GitHub OAuth App
- [ ] Copied Client ID and Client Secret
- [ ] Created Cloudflare Worker account
- [ ] Deployed Worker with YOUR Client ID and Secret
- [ ] Copied Worker URL
- [ ] Updated `auth-config.js` line 7 with Client ID
- [ ] Updated `auth-config.js` line 51 with Worker URL
- [ ] Committed and pushed to GitHub
- [ ] Enabled GitHub Pages
- [ ] Tested the portal

---

**That's it! Only 3 values to fill in, and your portal will be secured to Vertex employees only!** 🔒✨

Need help? Open the browser console (F12) to see error messages.
