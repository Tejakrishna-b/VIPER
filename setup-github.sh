#!/bin/bash

# VIPER Portal - GitHub Setup Script
# This script will guide you through setting up your GitHub repository

echo "================================================"
echo "🚀 VIPER Portal - GitHub Setup"
echo "================================================"
echo ""
echo "⚠️  IMPORTANT: You need to create the GitHub repository FIRST!"
echo ""
echo "📋 STEP 1: Create Repository on GitHub"
echo "----------------------------------------"
echo "1. Open this URL in your browser:"
echo "   https://github.com/new"
echo ""
echo "2. Fill in the form:"
echo "   Repository name: VIPER-main"
echo "   Description: VIPER Knowledge Portal"
echo "   Visibility: ☑️  Public (required for free GitHub Pages)"
echo "   ⚠️  DO NOT check 'Initialize with README'"
echo ""
echo "3. Click 'Create repository'"
echo ""
echo "================================================"
echo ""
read -p "Have you created the repository? (y/n): " created

if [ "$created" != "y" ] && [ "$created" != "Y" ]; then
    echo ""
    echo "❌ Please create the repository first, then run this script again."
    echo ""
    echo "Create at: https://github.com/new"
    exit 1
fi

echo ""
echo "================================================"
echo "📤 STEP 2: Pushing Code to GitHub"
echo "================================================"
echo ""

# Check if remote exists and remove if it does
if git remote | grep -q "origin"; then
    echo "Removing existing remote..."
    git remote remove origin
fi

# Add remote
echo "Adding GitHub remote..."
git remote add origin https://github.com/Tejakrishna-b/VIPER-main.git

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "================================================"
    echo "📄 STEP 3: Enable GitHub Pages"
    echo "================================================"
    echo ""
    echo "1. Go to: https://github.com/Tejakrishna-b/VIPER-main/settings/pages"
    echo "2. Under 'Source':"
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo "3. Click 'Save'"
    echo "4. Wait 2-3 minutes"
    echo ""
    echo "================================================"
    echo "🎉 Your Portal Will Be Live At:"
    echo "https://Tejakrishna-b.github.io/VIPER-main/"
    echo "================================================"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common reasons:"
    echo "1. Repository doesn't exist - Create it at: https://github.com/new"
    echo "2. Authentication failed - You may need a Personal Access Token"
    echo ""
    echo "To use Personal Access Token:"
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Select 'repo' scope"
    echo "4. Copy the token"
    echo "5. Run this script again and use token as password"
    echo ""
fi
