# VIPER Knowledge Portal

A comprehensive knowledge portal for VIPER (Vertex's Internal Portal for Employee Resources).

## 🚀 Live Portal

**Access the portal at:** https://Tejakrishna-b.github.io/VIPER/

## 📁 Project Structure

```
VIPER/
├── index.html           # Main portal page
├── auth-config.js       # Authentication configuration (optional)
├── cloudflare-worker.js # OAuth proxy for authentication (optional)
└── README.md           # This file
```

## 🛠️ Setup

### Enable GitHub Pages

1. Go to [Repository Settings > Pages](https://github.com/Tejakrishna-b/VIPER/settings/pages)
2. Under **"Build and deployment"**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
3. Click **Save**
4. Wait 2-3 minutes for deployment

### Local Development

Open `index.html` directly in your browser:

```bash
open index.html
```

Or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## 📝 Features

- Knowledge base sections
- Mermaid diagrams for visualizations
- Responsive sidebar navigation
- Clean, professional design

## 🔒 Authentication

The portal uses GitHub OAuth authentication with **email domain verification**.

### Who Can Access:
✅ Anyone with **@vertexinc.com** or **@vertex.com** email  
✅ Specific GitHub usernames (configured in auth-config.js)  

### Setup Authentication:
**Follow the complete guide:** [SETUP-AUTH.md](SETUP-AUTH.md)

Quick steps:
1. Create GitHub OAuth App
2. Deploy Cloudflare Worker
3. Update `auth-config.js` with your credentials
4. Push to GitHub

**Setup time:** ~15 minutes

---

**Maintained by:** Tejakrishna-b
