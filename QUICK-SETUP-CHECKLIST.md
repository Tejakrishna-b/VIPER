# Quick Setup Checklist ✅

## 🚀 Fast Track Setup (15 minutes)

Follow these steps in order:

### ☐ Step 1: Create GitHub OAuth App (5 min)
1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Name**: `VIPER Portal Auth`
   - **Homepage**: `https://YOUR_USERNAME.github.io/VIPER-main/`
   - **Callback**: `https://YOUR_USERNAME.github.io/VIPER-main/`
4. Click "Register application"
5. **Save your Client ID** 📝
6. Generate and **save your Client Secret** 📝 (keep it private!)

### ☐ Step 2: Deploy Authentication Proxy (5 min)
**Using Cloudflare Workers (Recommended - FREE):**

1. Go to: https://workers.cloudflare.com/
2. Sign up (free)
3. Create new Worker
4. Copy code from `cloudflare-worker.js` (see below)
5. Replace these values:
   - `YOUR_USERNAME.github.io` → Your GitHub Pages URL
   - `YOUR_GITHUB_CLIENT_ID` → Client ID from Step 1
   - `YOUR_GITHUB_CLIENT_SECRET` → Client Secret from Step 1
6. Deploy
7. **Save your Worker URL** 📝 (e.g., `https://viper-auth.workers.dev`)

### ☐ Step 3: Configure Authentication (3 min)
Edit `auth-config.js`:

```javascript
const AUTH_CONFIG = {
    clientId: 'YOUR_CLIENT_ID_HERE',  // From Step 1
    redirectUri: 'https://YOUR_USERNAME.github.io/VIPER-main/',  // Your GitHub Pages URL
    allowedDomains: [
        '@vertexinc.com',  // ⚠️ CHANGE THIS to your company domain!
    ],
};
```

Find this line (around line 51) and update:
```javascript
const response = await fetch('YOUR_WORKER_URL_HERE/auth/github', {
```
Replace `YOUR_WORKER_URL_HERE` with your Worker URL from Step 2.

### ☐ Step 4: Enable GitHub Pages (2 min)
1. Go to repository Settings → Pages
2. Source: `main` branch, `/ (root)` folder
3. Save
4. Wait 1-2 minutes for deployment

### ☐ Step 5: Test! (1 min)
1. Open: `https://YOUR_USERNAME.github.io/VIPER-main/`
2. Should redirect to GitHub login
3. After login, portal should load
4. Test with non-company email (should show "Access Denied")

---

## 📋 Configuration Values Template

Fill this out as you go:

```
GitHub OAuth App:
├─ Client ID: _________________________________
├─ Client Secret: _____________________________
└─ Callback URL: https://____USERNAME____.github.io/____REPO____/

Cloudflare Worker:
└─ Worker URL: https://________________________

Company Email Domain:
└─ Domain: @_________________________________

GitHub Pages URL:
└─ URL: https://____USERNAME____.github.io/____REPO____/
```

---

## 🔥 Cloudflare Worker Code

Create a new file `cloudflare-worker.js` with this code:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': 'https://YOUR_USERNAME.github.io',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  if (request.method === 'POST' && new URL(request.url).pathname === '/auth/github') {
    try {
      const { code } = await request.json()
      
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: 'YOUR_GITHUB_CLIENT_ID',
          client_secret: 'YOUR_GITHUB_CLIENT_SECRET',
          code: code
        })
      })

      const data = await tokenResponse.json()
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://YOUR_USERNAME.github.io',
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://YOUR_USERNAME.github.io',
        }
      })
    }
  }

  return new Response('Not Found', { status: 404 })
}
```

**⚠️ Replace these 3 values in the code above:**
1. `YOUR_USERNAME.github.io` (appears 3 times)
2. `YOUR_GITHUB_CLIENT_ID` (appears 1 time)
3. `YOUR_GITHUB_CLIENT_SECRET` (appears 1 time)

---

## ⚡ Super Quick Alternative (30 seconds)

If you just want to make the repo private RIGHT NOW:

1. Repository Settings → Danger Zone → Change visibility → Make private
2. Add collaborators under Settings → Collaborators

**Note**: Only works if you have GitHub Enterprise or GitHub Pro. Free accounts can make repos private but can't use GitHub Pages with private repos.

---

## ❌ Common Mistakes

- ❌ Forgetting to update `allowedDomains` with your actual company domain
- ❌ Not updating the Worker URL in `auth-config.js`
- ❌ Mismatched callback URLs between OAuth App and `redirectUri`
- ❌ Committing Client Secret to GitHub (use Workers secrets instead)
- ❌ Using `http://` instead of `https://`

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Infinite redirect loop | Clear cookies, check redirect URI matches exactly |
| "Authentication failed" | Check Client ID in both auth-config.js and Worker |
| "Access Denied" for your own account | Check your GitHub email settings, verify domain spelling |
| Page loads without authentication | Check if auth-config.js is loaded correctly |
| Worker returns 404 | Check Worker URL path ends with `/auth/github` |

---

## ✅ Success Checklist

After setup, verify:
- [ ] Non-logged-in users are redirected to GitHub
- [ ] Company email users can access the portal
- [ ] Non-company email users see "Access Denied"
- [ ] User avatar appears in top-right corner
- [ ] Logout button works
- [ ] Portal loads completely after authentication

---

**Need help?** Check `AUTHENTICATION-SETUP.md` for detailed instructions.
