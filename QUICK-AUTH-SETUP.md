# ⚡ Quick GitHub Authentication Setup

## Why GitHub Auth for VIPER?
✅ Every team member already has GitHub account  
✅ Company email (@vertexinc.com) already linked to GitHub  
✅ Single Sign-On - no new passwords needed  
✅ Easy to manage access control  

---

## 🚀 3-Step Setup (15 minutes total)

### Step 1: Create GitHub OAuth App (3 minutes)

#### 1.1 Open GitHub OAuth Settings
**Click this link:** https://github.com/settings/applications/new

#### 1.2 Fill in the form exactly like this:

```
Application name: VIPER Portal
Homepage URL: https://Tejakrishna-b.github.io/VIPER/
Application description: Vertex Internal Portal for Employee Resources
Authorization callback URL: https://Tejakrishna-b.github.io/VIPER/
```

#### 1.3 Click "Register application"

#### 1.4 Get your Client ID
You'll see a **Client ID** like: `Iv1.abc123def456`  
📋 **Copy it** - paste it somewhere safe

#### 1.5 Generate Client Secret
1. Click **"Generate a new client secret"**
2. You'll see a secret like: `ghp_abc123xyz...`
3. 📋 **Copy it IMMEDIATELY** (you can't see it again!)

⚠️ **IMPORTANT:** Keep these credentials safe! You'll need them in Step 2.

---

### Step 2: Setup Cloudflare Worker (5 minutes)

We need a secure backend to handle the OAuth flow (GitHub requires this for security).

#### 2.1 Create Cloudflare Account
- Go to: https://dash.cloudflare.com/sign-up
- Sign up (it's FREE, no credit card needed)
- Verify your email

#### 2.2 Create Worker
1. After login, click **"Workers & Pages"** in left sidebar
2. Click **"Create application"**
3. Click **"Create Worker"**
4. Name it: `viper-auth`
5. Click **"Deploy"**

#### 2.3 Edit Worker Code
1. After deployment, click **"Edit code"**
2. You'll see a code editor
3. **Select ALL the existing code and DELETE it**
4. Open your `cloudflare-worker.js` file (in your VIPER project folder)
5. **Copy ALL the code** from that file
6. **Paste it** into the Cloudflare editor

#### 2.4 Update Configuration
In the Cloudflare editor, find these 3 lines at the top:
```javascript
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const GITHUB_CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';
const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';
```

**Replace with YOUR values from Step 1:**
```javascript
const GITHUB_CLIENT_ID = 'Iv1.abc123def456';  // ← Your Client ID
const GITHUB_CLIENT_SECRET = 'ghp_abc123xyz...';  // ← Your Client Secret
const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';  // ← Keep as-is
```

#### 2.5 Save and Deploy
1. Click **"Save and Deploy"** (top right)
2. After deployment, you'll see your worker URL
3. 📋 **Copy the URL** - it looks like: `https://viper-auth.YOURNAME.workers.dev`

---

### Step 3: Update Your Portal Configuration (3 minutes)

#### 3.1 Edit auth-config.js
Open the file: `/Users/tejakrishna.b/Desktop/VIPER/auth-config.js`

Find this line (around line 6):
```javascript
clientId: 'YOUR_GITHUB_CLIENT_ID',
```

**Replace with YOUR Client ID from Step 1:**
```javascript
clientId: 'Iv1.abc123def456',  // Your actual Client ID
```

#### 3.2 Update Worker URL
Find this line (around line 63):
```javascript
const response = await fetch('https://YOUR_WORKER_URL.workers.dev/auth/github', {
```

**Replace with YOUR Worker URL from Step 2:**
```javascript
const response = await fetch('https://viper-auth.YOURNAME.workers.dev/auth/github', {
```

#### 3.3 Save and Deploy
Open Terminal in your VIPER folder and run:
```bash
git add auth-config.js
git commit -m "Configure GitHub OAuth credentials"
git push origin main
```

---

## Step 4: Enable GitHub Pages (if not done yet)

1. Go to: https://github.com/Tejakrishna-b/VIPER/settings/pages
2. Under **"Build and deployment"**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
3. Click **"Save"**
4. Wait 2-3 minutes

---

## 🎉 Test It!

1. Visit: **https://Tejakrishna-b.github.io/VIPER/**
2. You'll see "Authenticating..." screen
3. You'll be redirected to GitHub
4. Click **"Authorize"**
5. You'll be redirected back to the portal
6. Portal loads! ✅

### Who Can Access?
✅ Anyone with **@vertexinc.com** email (verified in GitHub)  
✅ Anyone with **@vertex.com** email  
✅ You (Tejakrishna-b) - your GitHub username is whitelisted  

---

## 🔧 Managing Access

### Add More Email Domains
Edit `auth-config.js`:
```javascript
allowedDomains: [
    '@vertexinc.com',
    '@vertex.com',
    '@example.com',  // Add more
],
```

### Add Specific GitHub Users
```javascript
allowedUsers: [
    'Tejakrishna-b',
    'colleague-username',  // Add teammates
],
```

### Make It Public (No Restrictions)
```javascript
allowedDomains: [],  // Empty = no domain check
allowedUsers: [],    // Empty = no username check
// Anyone with GitHub account can access
```

---

## ❓ FAQ

**Q: Do users need to login every time?**  
A: No, session is saved until browser closes.

**Q: What if someone doesn't have work email on GitHub?**  
A: They can add it: https://github.com/settings/emails

**Q: Can I test before deploying?**  
A: Yes! Open `index.html` locally - it will still authenticate with GitHub.

**Q: Is it secure?**  
A: Yes! Client Secret is hidden in Cloudflare Worker, not in your code.

**Q: What if Cloudflare Worker goes down?**  
A: Cloudflare has 99.99% uptime. For critical needs, consider GitHub Enterprise OAuth.

---

## 🐛 Troubleshooting

### "The redirect URI does not match"
- Check GitHub OAuth App callback URL
- Must be: `https://Tejakrishna-b.github.io/VIPER/`
- Must match exactly (including trailing slash)

### "Access Denied"
- User needs to add work email to GitHub
- Go to: https://github.com/settings/emails
- Add and verify @vertexinc.com email

### "Authentication failed"
- Check Cloudflare Worker is deployed and running
- Check Worker URL in auth-config.js is correct
- Check Client ID and Secret in Worker are correct

### Stuck on "Authenticating..."
- Check browser console (F12) for errors
- Verify Worker URL is correct
- Test Worker: Visit `https://your-worker.workers.dev/health`

---

## 📞 Need Help?

1. Check browser console (F12) for error messages
2. Check Cloudflare Worker logs in dashboard
3. Verify all URLs match exactly (no typos)
4. Test Worker health endpoint: `https://your-worker.workers.dev/health`

---

**Ready to start? Begin with Step 1!** 🚀
