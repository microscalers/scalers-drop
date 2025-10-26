#!/bin/bash
set -e

echo "🚀 Starting rebuild and deployment process..."

# Step 1: Clean and rebuild
echo "📦 Building project..."
npm run build

# Step 2: Add all changes and commit
echo "📝 Committing changes..."
git add .
git commit -m "build: production build $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Step 3: Push to main branch
echo "⬆️  Pushing to main branch..."
git push origin main

# Step 4: Deploy to Cloudflare (if wrangler is available)
echo "☁️  Deploying to Cloudflare..."
if command -v wrangler &> /dev/null; then
    # If wrangler is available, deploy
    wrangler pages deploy dist --project-name=scalers-drop
    echo "✅ Successfully deployed to Cloudflare Pages!"
else
    echo "⚠️  Wrangler not found. Install with: npm install -g wrangler"
    echo "   Then run: wrangler pages deploy dist --project-name=scalers-drop"
fi

echo "🎉 Deployment process complete!"