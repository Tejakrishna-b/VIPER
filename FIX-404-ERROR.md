# 🚨 Fix 404 Error - GitHub Setup Required

## Why You're Getting 404

Your files are on your local computer but **not on GitHub yet**. GitHub Pages needs the files to be in a GitHub repository first.

---

## 🚀 SOLUTION: Push to GitHub (5 minutes)

### Option 1: Create New Repository on GitHub (Recommended)

#### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Fill in:
   ```
   Repository name: VIPER-main
   Description: VIPER Knowledge Portal (Optional)
   Visibility: Public (required for free GitHub Pages)
   ```
3. **DO NOT** check "Initialize with README"
4. Click **"Create repository"**

#### Step 2: Push Your Code
GitHub will show you commands. **OR** run these in Terminal:

```bash
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to: https://github.com/Tejakrishna-b/VIPER-main/settings/pages
2. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
3. Click **Save**
4. Wait 2-3 minutes for deployment

#### Step 4: Visit Your Portal
URL: https://Tejakrishna-b.github.io/VIPER-main/

---

### Option 2: Use Existing Repository

If you already have a repository named VIPER-main:

```bash
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git
git push -u origin main
```

---

## ⚡ Quick Copy-Paste Commands

Open Terminal in `/Users/tejakrishna.b/Downloads/VIPER-main` and run:

```bash
# Connect to GitHub (replace with your actual repo URL if different)
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git

# Set main as default branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get an error about authentication:**

Use Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`
4. Copy the token
5. When prompted for password, paste the token

---

## 🔍 Common Issues

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git
git push -u origin main
```

### "repository not found"
The repository doesn't exist on GitHub yet. Create it first at: https://github.com/new

### "Permission denied"
You need to authenticate:
- Use Personal Access Token (see above)
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## ✅ Verification Steps

After pushing:

1. **Check if files are on GitHub:**
   - Visit: https://github.com/Tejakrishna-b/VIPER-main
   - You should see all your files

2. **Check if GitHub Pages is building:**
   - Go to: https://github.com/Tejakrishna-b/VIPER-main/settings/pages
   - Should show: "Your site is live at https://Tejakrishna-b.github.io/VIPER-main/"

3. **Visit your portal:**
   - URL: https://Tejakrishna-b.github.io/VIPER-main/
   - Should redirect to GitHub login (authentication working!)

---

## 📋 Current Status

✅ Files ready on your computer
✅ Git repository initialized
✅ Files committed to local git
❌ **NOT YET:** Pushed to GitHub
❌ **NOT YET:** GitHub Pages enabled

---

## 🎯 Your Next Actions

1. **Create repository on GitHub** (if not exists): https://github.com/new
2. **Run the push commands** (see Quick Copy-Paste section above)
3. **Enable GitHub Pages** in repository settings
4. **Wait 2-3 minutes** for first deployment
5. **Visit**: https://Tejakrishna-b.github.io/VIPER-main/

---

## 🆘 Still Getting 404?

### After pushing to GitHub, if still 404:

1. **Check repository exists:**
   - https://github.com/Tejakrishna-b/VIPER-main

2. **Check GitHub Pages settings:**
   - Settings → Pages → Source should be "main" branch

3. **Wait a few minutes:**
   - First deployment can take 2-5 minutes

4. **Check deployment status:**
   - Go to: https://github.com/Tejakrishna-b/VIPER-main/actions
   - Should see "pages build and deployment" running/completed

5. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

---

## 📞 Need Help?

Check these:
- GitHub repository URL: https://github.com/Tejakrishna-b/VIPER-main
- GitHub Pages URL: https://Tejakrishna-b.github.io/VIPER-main/
- GitHub Pages settings: https://github.com/Tejakrishna-b/VIPER-main/settings/pages

---

**Start here:** Create repository at https://github.com/new

**Then run these commands:**
```bash
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git
git push -u origin main
```

**Then enable GitHub Pages** in repository settings!
