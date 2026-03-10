# VIPER Portal Authentication Setup Guide

This guide will help you configure authentication for your VIPER Knowledge Portal to restrict access to authorized company users only.

## 🎯 Overview

Your portal now requires GitHub authentication. After setup, users must:
1. Sign in with their GitHub account
2. Have an authorized company email or be in the allowed users list
3. Pass authorization checks before accessing content

---

## 📋 Setup Instructions

### Option 1: GitHub OAuth Authentication (Recommended for Enterprise)

This method requires users to authenticate with GitHub and checks their email domain.

#### Step 1: Create a GitHub OAuth App

1. Go to your GitHub Settings:
   - **Personal OAuth App**: https://github.com/settings/developers
   - **Organization OAuth App**: https://github.com/organizations/YOUR_ORG/settings/applications

2. Click **"New OAuth App"** or **"Register a new application"**

3. Fill in the application details:
   ```
   Application name: VIPER Portal Auth
   Homepage URL: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   Authorization callback URL: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

4. Click **"Register application"**

5. **Copy the Client ID** (you'll need this)

6. Click **"Generate a new client secret"** and copy it (keep it secure!)

#### Step 2: Set Up Authentication Proxy (Required for Security)

GitHub OAuth requires a server-side component to exchange the authorization code for an access token securely.

**Option A: Use Cloudflare Workers (Free & Easy)**

1. Create a free Cloudflare account at https://workers.cloudflare.com/

2. Create a new Worker with this code:

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
      
      // Exchange code for access token
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

3. Replace:
   - `YOUR_USERNAME.github.io` with your GitHub Pages domain
   - `YOUR_GITHUB_CLIENT_ID` with your OAuth App Client ID
   - `YOUR_GITHUB_CLIENT_SECRET` with your OAuth App Client Secret

4. Deploy the Worker and copy the Worker URL (e.g., `https://your-worker.YOUR_SUBDOMAIN.workers.dev`)

**Option B: Use AWS Lambda + API Gateway**

See detailed instructions in `aws-lambda-setup.md`

**Option C: Use Your Company's Backend**

If your company has an existing authentication service, integrate with that instead.

#### Step 3: Configure auth-config.js

1. Open `auth-config.js` in your repository

2. Update the configuration:

```javascript
const AUTH_CONFIG = {
    // Your OAuth App Client ID
    clientId: 'YOUR_GITHUB_CLIENT_ID',
    
    // Your GitHub Pages URL
    redirectUri: 'https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/',
    
    // Allowed company email domains
    allowedDomains: [
        '@vertexinc.com',  // Your company domain
        '@vertex.com'      // Add more as needed
    ],
    
    // Optional: Specific GitHub usernames
    allowedUsers: [
        // 'username1',
        // 'username2'
    ],
};
```

3. In the `handleCallback` function, update the backend proxy URL:

```javascript
const response = await fetch('https://your-worker.workers.dev/auth/github', {
    // ... rest of the code
});
```

#### Step 4: Deploy to GitHub Pages

1. Commit your changes:
```bash
git add .
git commit -m "Add authentication to VIPER portal"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Select source branch (main) and folder (root or /docs)
   - Save

3. Your portal will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

### Option 2: Make Repository Private (Enterprise Only)

If you have GitHub Enterprise or GitHub Pro/Team:

1. Go to your repository Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make private"
4. Add collaborators under "Collaborators and teams"

**Note**: This hides the entire repository, not just the published site. Only works with GitHub Enterprise for Pages.

---

### Option 3: Use GitHub Organization with Enterprise

If your company has GitHub Enterprise:

1. Create the repository in your **organization** (not personal account)
2. Enable GitHub Pages
3. Configure SAML SSO for your organization
4. Only authenticated org members can access

---

## 🔧 Configuration Options

### Email Domain Restrictions

```javascript
allowedDomains: [
    '@yourcompany.com',
    '@contractor.com',
    '@partner.com'
]
```

### Username Whitelist

```javascript
allowedUsers: [
    'john-doe',
    'jane-smith',
    'admin-user'
]
```

### Organization Membership (Advanced)

Add organization membership check in `isAuthorized` method:

```javascript
async checkOrgMembership(username) {
    const response = await fetch(`https://api.github.com/orgs/YOUR_ORG/members/${username}`, {
        headers: {
            'Authorization': `token ${this.token}`
        }
    });
    return response.status === 204;
}
```

---

## 🧪 Testing

1. Open your portal URL in an incognito/private window
2. You should be redirected to GitHub login
3. After authorizing, check:
   - ✅ Users with company emails can access
   - ❌ Users without company emails see "Access Denied"
   - ✅ User info displayed in top-right corner
   - ✅ Logout works correctly

---

## 🔒 Security Best Practices

1. **Never commit OAuth secrets to Git**
   - Use environment variables or Workers secrets

2. **Use HTTPS only**
   - GitHub Pages uses HTTPS by default

3. **Rotate OAuth secrets regularly**
   - Generate new client secrets every 90 days

4. **Monitor OAuth app usage**
   - Check GitHub OAuth app settings for suspicious activity

5. **Set up rate limiting**
   - Add rate limiting to your authentication proxy

---

## 🐛 Troubleshooting

### "Authentication failed" error
- Check if OAuth Client ID is correct in `auth-config.js`
- Verify redirect URI matches exactly in GitHub OAuth App settings
- Check browser console for detailed error messages

### Infinite redirect loop
- Clear cookies and local storage
- Check redirect URI configuration
- Ensure your proxy is returning the correct response

### "Access Denied" for authorized users
- Check email domain spelling in `allowedDomains`
- Verify user's GitHub email settings (must be verified)
- Check if user has public email or primary email set

### Content not loading
- Check browser console for JavaScript errors
- Verify `auth-config.js` is loaded correctly
- Check if main content div has correct ID

---

## 📞 Support

For issues or questions:
- Check GitHub OAuth documentation: https://docs.github.com/en/developers/apps/building-oauth-apps
- Review browser console logs for errors
- Test authentication proxy independently
- Contact your DevOps/Platform team

---

## 🔄 Alternative Solutions

### Static Password Protection (Quick but Less Secure)

If you need a quick solution without OAuth:

```javascript
// Add at the start of <body>
<script>
const password = prompt('Enter password:');
if (password !== 'YOUR_SECRET_PASSWORD') {
    document.body.innerHTML = 'Access Denied';
    throw new Error('Unauthorized');
}
</script>
```

**⚠️ Warning**: This is easily bypassed by viewing page source. Not recommended for sensitive content.

### Company VPN Only

Restrict access by:
1. Hosting on internal company network instead of GitHub Pages
2. Use company intranet servers
3. Configure network-level access controls

---

## 📝 What's Been Configured

✅ **Files Created/Modified:**
- `index.html` - Added authentication gate and main content wrapper
- `auth-config.js` - Authentication logic and configuration
- `AUTHENTICATION-SETUP.md` - This setup guide

✅ **Features Added:**
- GitHub OAuth integration
- Email domain verification
- Username whitelist support
- Loading screen during authentication
- User info display with logout
- Access denied page for unauthorized users

✅ **Next Steps:**
1. Create GitHub OAuth App
2. Set up authentication proxy
3. Configure `auth-config.js` with your settings
4. Test authentication flow
5. Deploy to GitHub Pages

Good luck! 🚀
