# 🔒 FREE GitHub Auth Setup - @vertexinc.com Only

## ✅ What You Get
- **ONLY @vertexinc.com employees** can access
- Uses GitHub authentication (employees already have GitHub accounts)
- **100% FREE** (Cloudflare Workers free tier: 100,000 requests/day)
- No credit card required

---

## 🚀 2-Step Setup (10 minutes)

### STEP 1: Deploy Cloudflare Worker (FREE - 5 minutes)

#### 1.1 Create Free Cloudflare Account
1. Go to: **https://dash.cloudflare.com/sign-up**
2. Enter your email and create password
3. Verify email (check inbox)
4. **No credit card needed!**

#### 1.2 Create Worker
1. After login, click **"Workers & Pages"** in the left menu
2. Click **"Create application"**
3. Click **"Create Worker"**
4. Name it: `viper-auth`
5. Click **"Deploy"**

#### 1.3 Add Your Code
1. After deployment, click **"Edit code"** button
2. You'll see a code editor with some default code
3. **Select ALL** the default code and **DELETE** it
4. Go to your VIPER folder and open: `cloudflare-worker-configured.js`
5. **Copy ALL** the code from that file
6. **Paste** it into the Cloudflare editor
7. Click **"Save and Deploy"** (top right)

#### 1.4 Get Your Worker URL
After saving, you'll see your worker URL at the top:
```
https://viper-auth.YOUR_USERNAME.workers.dev
```
📋 **COPY THIS URL** - you need it for Step 2!

---

### STEP 2: Connect Worker to Portal (2 minutes)

#### 2.1 Update auth-config.js
Open file: `/Users/tejakrishna.b/Desktop/VIPER/auth-config.js`

Find line **63** (looks like this):
```javascript
const response = await fetch('https://YOUR_WORKER_URL.workers.dev/auth/github', {
```

**Replace with YOUR Worker URL**:
```javascript
const response = await fetch('https://viper-auth.YOUR_USERNAME.workers.dev/auth/github', {
```

#### 2.2 Deploy to GitHub
Open Terminal and run:
```bash
cd /Users/tejakrishna.b/Desktop/VIPER
git add auth-config.js index.html
git commit -m "Enable @vertexinc.com authentication"
git push origin main
```

---

## 🎉 DONE! Test It

1. Wait 2-3 minutes for GitHub Pages to update
2. Visit: **https://Tejakrishna-b.github.io/VIPER/**
3. You'll be redirected to GitHub login
4. After login, GitHub checks your email
5. ✅ If email is **@vertexinc.com** → Access granted!
6. ❌ If other email → Access denied

---

## 🔐 How It Works

1. User visits your portal
2. Portal redirects to GitHub for login
3. User authorizes with GitHub account
4. GitHub sends code to your Cloudflare Worker
5. Worker exchanges code for access token (securely)
6. Worker returns token to portal
7. Portal checks if user has **@vertexinc.com** email
8. ✅ Access granted or ❌ Access denied

**YOUR CLIENT SECRET IS SAFE** - it's only in Cloudflare Worker, never exposed to users!

---

## 💰 Cloudflare Free Tier

✅ **100,000 requests per day** - FREE  
✅ **No credit card required**  
✅ **No time limit** - free forever  
✅ **More than enough** for internal portal  

Example: 100 employees × 10 logins/day = 1,000 requests (1% of free quota)

---

## ❓ FAQ

**Q: Do employees need to do anything?**  
A: Just add @vertexinc.com email to their GitHub account at: https://github.com/settings/emails

**Q: What if they don't have GitHub?**  
A: They create free GitHub account and add work email

**Q: Can I test locally?**  
A: Yes! Open index.html - it will authenticate with GitHub even locally

**Q: Is it really free?**  
A: Yes! Cloudflare Workers free tier is permanent, no credit card needed

**Q: What if Worker goes down?**  
A: Cloudflare has 99.99% uptime, better than most services

---

## 🐛 Troubleshooting

### "Authentication failed"
- Check Worker URL in auth-config.js line 63
- Make sure you deployed the worker code

### "Access Denied"
- Employee needs @vertexinc.com email in GitHub
- Go to: https://github.com/settings/emails
- Add and verify company email

### Still stuck?
1. Open browser console (F12)
2. Look for error messages
3. Test Worker: Visit `https://your-worker.workers.dev/health`
4. Should show: `{"status":"ok","service":"GitHub OAuth Proxy"}`

---

## 📞 Next Steps

1. **[Create Cloudflare Account](https://dash.cloudflare.com/sign-up)** (FREE)
2. Deploy Worker (copy from `cloudflare-worker-configured.js`)
3. Update `auth-config.js` with your Worker URL
4. Push to GitHub
5. Test at: https://Tejakrishna-b.github.io/VIPER/

**Ready? Start with Step 1!** 🚀

---

**Your credentials are already configured:**
- ✅ GitHub OAuth App: `Ov23licjO6ph0IxnBL8Y`
- ✅ Client Secret: In `cloudflare-worker-configured.js`
- ✅ Allowed domain: `@vertexinc.com`
- ✅ Portal URL: `https://Tejakrishna-b.github.io/VIPER/`
