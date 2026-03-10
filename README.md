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

## 🔒 Authentication (Optional)

The portal includes optional GitHub OAuth authentication. To enable:

1. Configure `auth-config.js` with your GitHub OAuth credentials
2. Deploy `cloudflare-worker.js` on Cloudflare Workers
3. Update the worker URL in `auth-config.js`

---

**Maintained by:** Tejakrishna-b
