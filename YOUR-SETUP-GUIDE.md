# 🚀 Your Personalized Setup Guide

**Username:** Tejakrishna-b  
**Authorized Domain:** @vertexinc.com, @vertex.com  
**GitHub Pages URL:** https://Tejakrishna-b.github.io/VIPER-main/

---

## ✅ Configuration Already Done

I've pre-configured your files with these values:
- ✅ GitHub username: `Tejakrishna-b`
- ✅ Allowed email domains: `@vertexinc.com` and `@vertex.com`
- ✅ GitHub Pages URL: `https://Tejakrishna-b.github.io/VIPER-main/`
- ✅ Cloudflare Worker origin: `https://Tejakrishna-b.github.io`

---

## 🎯 Quick Setup (3 Steps - 15 minutes)

### Step 1: Create GitHub OAuth App (5 minutes)

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in exactly:
   ```
   Application name: VIPER Portal Auth
   Homepage URL: https://Tejakrishna-b.github.io/VIPER-main/
   Authorization callback URL: https://Tejakrishna-b.github.io/VIPER-main/
   ```
4. Click **"Register application"**
5. **Copy your Client ID** 📝
6. Click **"Generate a new client secret"**
7. **Copy your Client Secret** 📝 (Keep it private!)

---

### Step 2: Deploy Cloudflare Worker (5 minutes)

1. Go to: https://workers.cloudflare.com/
2. Sign up (free account)
3. Click **"Create a Service"**
4. Name it: `viper-auth` (or anything you like)
5. Click **"Quick Edit"**
6. **Copy ALL the code from `cloudflare-worker.js`** file
7. **Update these 2 values** in the code:
   ```javascript
   const GITHUB_CLIENT_ID = 'paste_your_client_id_here';
   const GITHUB_CLIENT_SECRET = 'paste_your_client_secret_here';
   ```
   ⚠️ Note: `ALLOWED_ORIGIN` is already set to `https://Tejakrishna-b.github.io`
8. Click **"Save and Deploy"**
9. **Copy your Worker URL** 📝 (e.g., `https://viper-auth.YOUR_SUBDOMAIN.workers.dev`)

---

### Step 3: Update auth-config.js (2 minutes)

1. Open `auth-config.js` in your editor
2. Update **line 7** with your Client ID:
   ```javascript
   clientId: 'paste_your_client_id_here',
   ```
3. Update **line 51** with your Worker URL:
   ```javascript
   const response = await fetch('https://viper-auth.YOUR_SUBDOMAIN.workers.dev/auth/github', {
   ```
4. Save the file

---

### Step 4: Deploy to GitHub (3 minutes)

1. Open Terminal in your VIPER-main folder
2. Run these commands:
   ```bash
   git add .
   git commit -m "Configure authentication for vertexinc.com users"
   git push origin main
   ```

3. Go to your repository: https://github.com/Tejakrishna-b/VIPER-main
4. Click **Settings** → **Pages**
5. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
6. Click **Save**
7. Wait 2-3 minutes for deployment

---

## 🎉 Test Your Portal

1. Visit: https://Tejakrishna-b.github.io/VIPER-main/
2. You'll be redirected to GitHub login
3. After login, the system checks your email:
   - ✅ **@vertexinc.com** email → Access Granted
   - ✅ **@vertex.com** email → Access Granted
   - ✅ Username **Tejakrishna-b** → Access Granted (even without company email)
   - ❌ Other emails → Access Denied

---

## 📋 Configuration Summary

Your `auth-config.js` is configured with:

```javascript
redirectUri: 'https://Tejakrishna-b.github.io/VIPER-main/',
allowedDomains: [
    '@vertexinc.com',    // Primary Vertex domain
    '@vertex.com'        // Alternative domain
],
allowedUsers: [
    'Tejakrishna-b',     // Your username (always allowed)
],
```

Your `cloudflare-worker.js` is configured with:

```javascript
ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io'
```

---

## 🔧 What Still Needs Your Input

You only need to provide 3 things:

### In auth-config.js (line 7):
```javascript
clientId: 'YOUR_GITHUB_CLIENT_ID',  // ⚠️ Replace with Client ID from Step 1
```

### In auth-config.js (line 51):
```javascript
const response = await fetch('YOUR_WORKER_URL/auth/github', {  // ⚠️ Replace with Worker URL from Step 2
```

### In cloudflare-worker.js (lines 5-6):
```javascript
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';        // ⚠️ From Step 1
const GITHUB_CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET'; // ⚠️ From Step 1
```

---

## ✅ Who Can Access Your Portal

After setup, these users can access:

✅ **Anyone with @vertexinc.com email** (authenticated via GitHub)
✅ **Anyone with @vertex.com email** (authenticated via GitHub)
✅ **GitHub user "Tejakrishna-b"** (you, always allowed)

❌ **Everyone else** will see "Access Denied"

---

## 🐛 Troubleshooting

### "Authentication failed"
- Check if Client ID is correct in both `auth-config.js` (line 7) and `cloudflare-worker.js` (line 5)
- Verify Client Secret in `cloudflare-worker.js` (line 6)

### "Access Denied" for Vertex employees
- Check browser console to see which email GitHub returned
- Verify the email ends with `@vertexinc.com` or `@vertex.com`
- User must have verified email in their GitHub account settings

### Infinite redirect loop
- Clear browser cookies and cache
- Verify callback URL in GitHub OAuth App matches exactly: `https://Tejakrishna-b.github.io/VIPER-main/`
- Check that redirectUri in auth-config.js matches

### Worker returns error
- Check Worker logs in Cloudflare dashboard
- Verify CORS origin is set to `https://Tejakrishna-b.github.io`
- Test Worker health: `https://your-worker.workers.dev/health`

---

## 📱 Quick Reference

| Item | Value |
|------|-------|
| **GitHub Username** | Tejakrishna-b |
| **GitHub Pages URL** | https://Tejakrishna-b.github.io/VIPER-main/ |
| **Repo URL** | https://github.com/Tejakrishna-b/VIPER-main |
| **Allowed Domains** | @vertexinc.com, @vertex.com |
| **OAuth App URL** | https://github.com/settings/developers |
| **Cloudflare Workers** | https://workers.cloudflare.com/ |

---

## 🎯 Final Checklist

Before going live:

- [ ] GitHub OAuth App created
- [ ] Client ID and Secret obtained
- [ ] Cloudflare Worker deployed
- [ ] Worker URL obtained
- [ ] `auth-config.js` updated with Client ID (line 7)
- [ ] `auth-config.js` updated with Worker URL (line 51)
- [ ] `cloudflare-worker.js` updated with Client ID & Secret (lines 5-6)
- [ ] Changes committed to GitHub
- [ ] GitHub Pages enabled
- [ ] Portal tested with Vertex email
- [ ] Portal tested with non-Vertex email (should deny)

---

## 🚀 Ready to Deploy?

Run these commands in Terminal:

```bash
cd /Users/tejakrishna.b/Downloads/VIPER-main

# Stage changes
git add .

# Commit changes
git commit -m "Configure authentication for Vertex Inc employees"

# Push to GitHub
git push origin main
```

Then enable GitHub Pages in your repository settings!

---

**Need help?** Check the other guide files or review the browser console for error messages.

**Your portal will be live at:** https://Tejakrishna-b.github.io/VIPER-main/ 🎉
