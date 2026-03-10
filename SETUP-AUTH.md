# 🔐 Authentication Setup Guide

This guide will help you enable GitHub OAuth authentication for your VIPER portal, allowing anyone with a **@vertexinc.com** or **@vertex.com** email to access.

## 📋 Prerequisites

- GitHub account
- Cloudflare account (free tier is fine)
- Your portal URL: `https://Tejakrishna-b.github.io/VIPER/`

---

## Step 1: Create GitHub OAuth App (5 minutes)

### 1.1 Go to GitHub Developer Settings
Visit: https://github.com/settings/developers

### 1.2 Create New OAuth App
1. Click **"New OAuth App"** (or **"OAuth Apps"** → **"New OAuth App"**)
2. Fill in the form:
   ```
   Application name: VIPER Knowledge Portal
   Homepage URL: https://Tejakrishna-b.github.io/VIPER/
   Authorization callback URL: https://Tejakrishna-b.github.io/VIPER/
   ```
3. Click **"Register application"**

### 1.3 Get Your Credentials
After creating the app, you'll see:
- **Client ID**: Copy this (looks like: `Iv1.abc123def456`)
- Click **"Generate a new client secret"**
- **Client Secret**: Copy this immediately (you can't see it again!)

⚠️ **Save both values** - you'll need them in the next steps.

---

## Step 2: Deploy Cloudflare Worker (5 minutes)

### 2.1 Create Cloudflare Worker
1. Go to: https://dash.cloudflare.com/
2. Sign up/login (free account works)
3. Go to **"Workers & Pages"** → **"Create application"** → **"Create Worker"**
4. Name it: `viper-auth` (or any name you like)
5. Click **"Deploy"**

### 2.2 Edit Worker Code
1. After deployment, click **"Edit code"**
2. **Replace all the code** with the content from `cloudflare-worker.js` file in your project
3. Update these 3 lines at the top:
   ```javascript
   const GITHUB_CLIENT_ID = 'YOUR_CLIENT_ID_FROM_STEP_1';
   const GITHUB_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_FROM_STEP_1';
   const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';
   ```
4. Click **"Save and Deploy"**

### 2.3 Get Worker URL
After deployment, you'll see your worker URL:
```
https://viper-auth.YOUR_USERNAME.workers.dev
```
**Copy this URL** - you'll need it in Step 3.

---

## Step 3: Update auth-config.js (2 minutes)

### 3.1 Edit auth-config.js
Open `auth-config.js` in your project and update:

```javascript
const AUTH_CONFIG = {
    // Replace with YOUR GitHub OAuth App Client ID
    clientId: 'Iv1.abc123def456',  // ← Your Client ID from Step 1
    
    redirectUri: 'https://Tejakrishna-b.github.io/VIPER/',
    
    allowedDomains: [
        '@vertexinc.com',
        '@vertex.com'
    ],
    
    allowedUsers: [
        'Tejakrishna-b',
    ],
};
```

### 3.2 Update Worker URL
Find line ~63 in `auth-config.js` and update:
```javascript
const response = await fetch('https://viper-auth.YOUR_USERNAME.workers.dev/auth/github', {
```
Replace with YOUR worker URL from Step 2.3.

---

## Step 4: Deploy to GitHub (1 minute)

```bash
git add auth-config.js
git commit -m "Configure GitHub OAuth authentication"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to redeploy.

---

## Step 5: Test Authentication

1. Visit: https://Tejakrishna-b.github.io/VIPER/
2. You'll be redirected to GitHub login
3. Authorize the app
4. You should be redirected back and see the portal!

### Authentication Rules:
✅ **Anyone with @vertexinc.com or @vertex.com email** - Access granted
✅ **Your GitHub username (Tejakrishna-b)** - Access granted
❌ **Other emails** - Access denied

---

## 🔧 Configuration Options

### Allow More Domains
Edit `auth-config.js`:
```javascript
allowedDomains: [
    '@vertexinc.com',
    '@vertex.com',
    '@contractor.com',  // Add more domains
],
```

### Allow Specific Users
```javascript
allowedUsers: [
    'Tejakrishna-b',
    'other-username',  // Add GitHub usernames
],
```

### Allow Everyone (No Restrictions)
```javascript
allowedDomains: [],     // Empty array
allowedUsers: [],       // Empty array
// This allows any authenticated GitHub user
```

---

## 🐛 Troubleshooting

### "Client ID not found"
- Check your GitHub OAuth App settings
- Make sure Client ID in `auth-config.js` matches

### "Access Denied"
- Check your GitHub email settings: https://github.com/settings/emails
- Ensure your work email is added and verified
- Make sure the email domain matches `@vertexinc.com`

### "Authentication failed"
- Check Cloudflare Worker is deployed
- Verify Worker URL in `auth-config.js` is correct
- Check Worker logs in Cloudflare dashboard

### CORS Errors
- Verify `ALLOWED_ORIGIN` in Cloudflare Worker matches your GitHub Pages URL
- Do NOT include trailing slash in ALLOWED_ORIGIN

---

## 📝 Quick Reference

**GitHub OAuth App**: https://github.com/settings/developers
**Cloudflare Dashboard**: https://dash.cloudflare.com/
**Your Portal**: https://Tejakrishna-b.github.io/VIPER/
**Auth Config**: `/auth-config.js`
**Worker Code**: `/cloudflare-worker.js`

---

## 🔒 Security Notes

- Never commit your Client Secret to git (it's already in Cloudflare Worker)
- The Cloudflare Worker acts as a secure proxy for OAuth
- Tokens are stored in browser sessionStorage (cleared on browser close)
- Users must re-authenticate each session

---

Need help? Check the configuration files or reach out to your team lead.
